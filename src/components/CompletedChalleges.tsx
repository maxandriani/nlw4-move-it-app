import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/CompletedChallenges.module.css";

export function CompletedChallenges() {
  const { completedChallenges } = useContext(ChallengesContext);

  return (
    <section className={styles.completedChallenges}>
      <h1 className={styles.title}>Desafios Completos</h1>
      <strong className={styles.description} title={`${completedChallenges} desafios`}>{completedChallenges}</strong>
    </section>
  );
}