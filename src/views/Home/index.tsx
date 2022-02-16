import { FC } from "react";

import Header from "./Header";
import SiteDescription from "./SiteDescription";
import JupiterForm from "../JupiterForm/JupiterForm";

import styles from "./index.module.css";

const Home: FC = ({}) => {
  return (
    <div className="container max-w-6xl p-8 mx-auto xxl:px-0">
      <div className={styles.container}>
        <Header />
        <SiteDescription />
        <JupiterForm />
      </div>
    </div>
  );
};

export default Home;
