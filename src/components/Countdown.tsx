import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const { minutes, seconds, hasFinished, isActive, startCountdown, resetCountdown } = useContext(CountdownContext);

  const [minuteFirstDigit, minuteSecondDigit] = minutes.toString().padStart(2, '0').split('');
  const [secondFirstDigit, secondSecondDigit] = seconds.toString().padStart(2, '0').split('');

  return (
    <section className={styles.countdown}>
      <div className={styles.clock} title={`${minutes} minutos e ${seconds} segundos`}>
        <span aria-hidden="true" className={styles.digit}>{minuteFirstDigit}</span>
        <span aria-hidden="true" className={styles.digit}>{minuteSecondDigit}</span>
        <span aria-hidden="true" className={styles.spacer}>:</span>
        <span aria-hidden="true" className={styles.digit}>{secondFirstDigit}</span>
        <span aria-hidden="true" className={styles.digit}>{secondSecondDigit}</span>
      </div>
      
      {hasFinished
        ? <button type="button" disabled className={styles.countdownBtn}>Ciclo encerrado</button>
        : 

        isActive 
          ? <button type="button" onClick={resetCountdown} className={[styles.countdownBtn, styles.active].join(' ')}>Abandonar ciclo</button>
          : <button type="button" onClick={startCountdown} className={styles.countdownBtn}>Iniciar um ciclo</button> }
    </section>
  );
}