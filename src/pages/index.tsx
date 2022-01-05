import type { NextPage } from "next";
import Head from "next/head";
import Home from "../views/Home";

const Index: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Lagrange.fi</title>
        <meta
          name="description"
          content="Decentralized Bureau de Change"
        />
      </Head>
      <Home />
    </div>
  );
};

export default Index;
