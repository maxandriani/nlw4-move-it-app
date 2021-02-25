import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import challenges from '../challenges.json';

export interface IChallengesProviderProps {}
export interface IChallengesState {
  level: number;
  xp: number;
  xpToNextLevel: number;
  completedChallenges: number;
  activeChallenge: IChallenge;
  
  levelUp(): void;
  startNewChallenge(): void;
  resetChallenge(): void;
  completeChallenge(): void;
}
export interface IChallenge {
  type: string;
  description: string;
  amount: number;
}

export const ChallengesContext = createContext<IChallengesState>({} as IChallengesState);

export function ChallengesProvider({ children }: PropsWithChildren<IChallengesProviderProps>) {
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState<IChallenge>(null);

  const xpToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const challengeIdx = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[challengeIdx];

    setActiveChallenge(challenge as IChallenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission == 'granted') {
      new Notification('Novo desafio 🎉🎉🎉', {
        body: `Valendo ${challenge.amount} XP!`
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;
    let finalXp = xp + amount;

    if (finalXp >= xpToNextLevel) {
      finalXp = finalXp - xpToNextLevel;
      levelUp();
    }

    setXp(finalXp)
    setActiveChallenge(null);
    setCompletedChallenges(completedChallenges + 1);
  }

  return (
    <ChallengesContext.Provider value={{
      level,
      xp,
      completedChallenges,
      activeChallenge,
      xpToNextLevel,
      levelUp,
      startNewChallenge,
      resetChallenge,
      completeChallenge
    }}>
      {children}
    </ChallengesContext.Provider>
  )
}