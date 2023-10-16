import Layout from "@/components/layout/layout";
import Head from "next/head";
import "@/styles/globals.css";
import { NotificationContextProvider } from "@/store/notification-context";

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name="description" content="Nextjs events" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="description"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
