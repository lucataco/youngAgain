import type { AppProps } from "next/app";
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react';
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script defer data-domain="youngagain.vercel.app" src="https://data.lucata.co/js/script.js" />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;