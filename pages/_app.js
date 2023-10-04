import Layout from "@/components/layout/layout";
import Head from "next/head";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="Nextjs events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="description" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
