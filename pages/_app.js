import "../styles/globals.css";

//INTERNAL IMPORT
import { Footer, Banner, NavBar } from "../Components";
import { TrackingProvider } from "../Context/TrackingContext";
import {AdminProvider} from "../Context/AdminContext"
<link rel="icon" href="/favicon.png" sizes="any" />
export default function App({ Component, pageProps }) {
  return (
    <>
    <AdminProvider>
      <TrackingProvider>
        
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        
      </TrackingProvider>
      </AdminProvider>
    </>
  );
}
