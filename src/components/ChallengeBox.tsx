import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  function challengeSucceeded() {
    completeChallenge();
    resetCountdown();
  }

  function challengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <section className={styles.challengeBox}>
      { activeChallenge != null
        ? (
        <div className={styles.active}>
          <header className={styles.bonus}>Ganhe {activeChallenge?.amount} xp</header>

          <main className={styles.challenge}>
            <img className={styles.avatar} src={`icons/${activeChallenge?.type}.svg`} alt="Uma mão erguida levantando um altere de academia." />
            <h1 className={styles.title}>Novo desafio</h1>
            <p className={styles.description}>{activeChallenge?.description}</p>
          </main>

          <footer className={styles.actionBar}>
            <button
              type="button"
              onClick={challengeSucceeded}
              className={`${styles.btn} ${styles.succeededBtn}`}>Completei</button>
            <button
              type="button"
              onClick={challengeFailed}
              className={`${styles.btn} ${styles.failedBtn}`}>Não consegui</button>
          </footer>
        </div>)
        : (
        <div className={styles.notActive}>
          <strong>Inicie e finalize um ciclo para receber desafios a serem completados.</strong>
          <p>
            <img className={styles.levelUp} src="icons/level-up.svg" alt="Imagem de um troféu simbolizando aumento de nível." />
            Avance de nível ao completar desafios.
          </p>
        </div>)}
    </section>
  )
}