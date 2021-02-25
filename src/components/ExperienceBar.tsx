import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';
// import { assert } from "console";
// import { PropsWithChildren } from "react";

export interface IExperienceBarProps {
}

export function ExperienceBar({  }: IExperienceBarProps) {
  // assert(min < max, `O valor mínimo (${min}) deve ser inferior ao valor máximo (${max});`);
  // assert(max > 0, `O atributo valor máximo (${max}) não pode ser zero.`);
  // assert(min <= value || max >= value, `O atributo valor (${value}) deve estar entre o valor mínimo (${min}) e máximo (${max}).`);

  const { xp, xpToNextLevel } = useContext(ChallengesContext);

  const percentualValue = xp / xpToNextLevel * 100;
  
  return (
    <header className={styles.experienceBar}>
      <span className={styles.label}>{0} XP</span>
      <svg className={styles.bar}
        role="progressbar"
        aria-valuenow={xp}
        aria-valuemin={0}
        aria-valuemax={xpToNextLevel}>
        <rect className={styles.barLineBg} x="0" y="0" width="100%" height="100%"></rect>
        <rect className={styles.barLine} x="0" y="0" width={`${percentualValue}%`} height="100%"></rect>
      </svg>
      <span className={styles.currentValue}>{xp} XP</span>
      <span className={styles.label}>{xpToNextLevel} XP</span>
    </header>
  )
}