import type { NextPage } from "next";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import useMounted from "./useMounted";
import WalletContainer from "../components/wallet";

const Home: NextPage = () => {
  const isMounted = useMounted();

  const { address, connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const { disconnect } = useDisconnect();

  if (!isMounted) {
    return (
      <div className={styles.main}>
        <>Loading ...</>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Next App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Hello Neel</h1>
        <div className={styles.grid}>
          {address ? (
            <div>
              <p className={styles.text}>Connected to {address || ""}</p>
              <button className={styles.btn} onClick={() => disconnect()}>
                Disconnect
              </button>
            </div>
          ) : (
            <div>
              <>
                {isConnected && <div>Connected to {activeConnector?.name}</div>}

                {connectors?.map((connector) => (
                  <button
                    className={styles.btn}
                    disabled={!connector.ready}
                    key={connector.id}
                    onClick={() => connect({ connector })}
                  >
                    {connector?.name}
                    {isLoading &&
                      pendingConnector?.id === connector.id &&
                      " (connecting)"}
                  </button>
                ))}

                {error && <div>{error?.message}</div>}
              </>
            </div>
          )}
          <WalletContainer />
        </div>
      </main>
    </div>
  );
};

export default Home;
