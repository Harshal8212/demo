import {
  StartTracking
} from "../../Components/index";
import { TrackingContext } from "../../Conetxt/TrackingContext";
import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import  { useRouter } from "next/router";


export default function Tracking({ Component, pageProps }) {

  const {
    currentUser,
    createShipment,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,
  } = useContext(TrackingContext);

  return (
    <>
      <StartTracking 
      getShipment={getShipment}
      />
      
    </>
  );
};
