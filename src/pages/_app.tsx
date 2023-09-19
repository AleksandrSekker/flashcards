import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import React from "react";
import Layout from "~/layout/Layout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Layout>

    <SessionProvider session={session}>
        <Component {...pageProps} />
    </SessionProvider>
    </Layout>

  );
};

export default api.withTRPC(MyApp);