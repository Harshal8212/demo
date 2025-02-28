import "../styles/globals.css";

//INTERNAL IMPORT
import { Footer, Banner, NavBar } from "../Components";
import { TrackingProvider } from "../Context/TrackingContext";
import {AdminProvider} from "../Context/AdminContext"
import {DeliveryProvider } from "../Context/DeliveryContext"
<link rel="icon" href="/favicon.png" sizes="any" />
export default function App({ Component, pageProps }) {
  return (
    <>
    <AdminProvider>
      <TrackingProvider>
        <DeliveryProvider>
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </DeliveryProvider>
      </TrackingProvider>
      </AdminProvider>
    </>
  );
}
