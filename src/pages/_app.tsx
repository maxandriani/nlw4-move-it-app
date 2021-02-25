import { ChallengesProvider } from "../contexts/ChallengesContext";
import "../styles/global.css";

function MoveItApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>)
}

export default MoveItApp
