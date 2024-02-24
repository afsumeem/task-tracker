import Head from "next/head";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/Todo");
  };

  return (
    <>
      <Head>
        <title>Task Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${styles.todoContainer} d-flex justify-content-center align-items-center`}
      >
        <div className={`${styles.heroSection}`}>
          {/* my todo title */}
          <h3 className="fw-bold text-center mt-4" style={{ color: "#4455b8" }}>
            Task Tracker
          </h3>

          {/* banner image */}
          <Image
            src="/banner.svg"
            alt="homePageBanner"
            className="d-block m-auto"
            width={200}
            height={200}
          />

          {/* get started button */}
          <div className={`${styles.startTaskContainer} d-block m-auto p-4`}>
            <p className="text-center fs-6">
              This Todo App provides you to manage your tasks effectively.
            </p>
            <p className="text-center fs-5 mb-4">
              Start managing your tasks today!
            </p>
          </div>
          <Button onClick={handleClick} className={styles.getStartedBtn}>
            <FaArrowRight />
          </Button>
        </div>
      </main>
    </>
  );
}
