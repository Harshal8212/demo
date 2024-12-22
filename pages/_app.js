import "../styles/globals.css";

//INTERNAL IMPORT
import { Footer, Banner, NavBar } from "../Components";
import { TrackingProvider } from "../Conetxt/TrackingContext";
<link rel="icon" href="/favicon.png" sizes="any" />
export default function App({ Component, pageProps }) {
  return (
    <>
      <TrackingProvider>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </TrackingProvider>
    </>
  );
}
