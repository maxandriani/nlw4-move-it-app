import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

export const DEFAULT_TIME = 25 * 60;

export interface ICountdownState {
  isActive: boolean;
  hasFinished: boolean;
  minutes: number;
  seconds: number;

  startCountdown(): void;
  resetCountdown(): void;
}
export interface ICountdownProviderProps {}

export const CountdownContext = createContext<ICountdownState>({} as ICountdownState);

export function CountdownProvider({ children }: PropsWithChildren<ICountdownProviderProps>) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(DEFAULT_TIME);
  const [isActive, setActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  function startCountdown() {
    setActive(!isActive);
  }

  function resetCountdown() {
    setActive(false);
    setTime(DEFAULT_TIME);
    setHasFinished(false);
  }

  useEffect(() => {
    let timeout;
    
    if (isActive && time > 0) {
      timeout = setTimeout(() => setTime(time - 1), 1000);
    } else if (isActive && time == 0) {
      setActive(false);
      setHasFinished(true);
      startNewChallenge();
    }

    // cleanup
    return () => (timeout) ? clearTimeout(timeout) : null;
  }, [isActive, time]);

  return (
    <CountdownContext.Provider value={{
      isActive,
      hasFinished,
      minutes,
      seconds,

      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}