import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import challenges from '../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

export interface ISession {
  level: number;
  xp: number;
  completedChallenges: number;
}

export interface IChallengesProviderProps {
  session: ISession;
}

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
  closeLevelUpModal(): void;
}
export interface IChallenge {
  type: string;
  description: string;
  amount: number;
}

export const ChallengesContext = createContext<IChallengesState>({} as IChallengesState);

export function ChallengesProvider({ children, session }: PropsWithChildren<IChallengesProviderProps>) {
  const [level, setLevel] = useState(session.level ?? 1);
  const [xp, setXp] = useState(session.xp ?? 0);
  const [completedChallenges, setCompletedChallenges] = useState(session.completedChallenges ?? 0);
  const [activeChallenge, setActiveChallenge] = useState<IChallenge>(null);
  const [showLevelUpModal, setShowLevelUpModal] = useState<boolean>(false);

  const xpToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', level?.toString());
    Cookies.set('xp', xp?.toString());
    Cookies.set('completedChallenges', completedChallenges?.toString());
  }, [level, xp, completedChallenges]);

  function levelUp() {
    setLevel(level + 1);
    setShowLevelUpModal(true);
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

  function closeLevelUpModal() {
    setShowLevelUpModal(false);
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
      completeChallenge,
      closeLevelUpModal
    }}>
      {children}
      {showLevelUpModal && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}