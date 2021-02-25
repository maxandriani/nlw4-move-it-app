import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <section className={styles.profile}>
      <img className={styles.picture} src="https://github.com/maxandriani.png" alt="Imagem de perfil do usuário." />
      <div className={styles.info}>
        <h1 className={styles.title}>Maxmiliano Andriani</h1>
        <p className={styles.description}>
          <img className={styles.icon} src="icons/level.svg" alt="Fecha verde apontando para cima." />
          Level: <strong>{level}</strong></p>
      </div>
    </section>
  );
}