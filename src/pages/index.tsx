import { CompletedChallenges } from "../components/CompletedChalleges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ChallengesProvider, ISession } from "../contexts/ChallengesContext";

export interface IHomeProps {
  session: ISession;
}

export default function Home({ session }: IHomeProps) {
  return (
    <ChallengesProvider session={session}>
      <div className={styles.container}>
        <Head>
          <title>Início | MoveIt</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section className={styles.content}>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<IHomeProps>> {
  const { level, xp, completedChallenges } = ctx.req.cookies;
  
  const session = {
    level: parseInt(level),
    xp: parseInt(xp),
    completedChallenges: parseInt(completedChallenges)
  };

  return {
    props: {
      session
    }
  }
}