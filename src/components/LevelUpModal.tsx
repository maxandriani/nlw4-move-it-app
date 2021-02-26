import { PropsWithChildren, useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from '../styles/components/LevelUpModal.module.css';

export interface ILevelUpModalProps {}

export function LevelUpModal({}: PropsWithChildren<ILevelUpModalProps>) {
  const { level, closeLevelUpModal } = useContext(ChallengesContext);

  return (
    <div className={styles.overlay}>
      <aside className={styles.levelUpModal}>
        <header className={styles.header}>{level}</header>
        
        <main className={styles.body}>
          <h1 className={styles.title}>Parabéns!</h1>
          <p>Você alcançou um novo level.</p>
        </main>

        <footer className={styles.footer}>
          <button className={styles.btn} type="button" onClick={closeLevelUpModal}>
            <img src="/icons/close.svg" alt="Fechar modal"></img>
          </button>
        </footer>
      </aside>
    </div>
  );
}