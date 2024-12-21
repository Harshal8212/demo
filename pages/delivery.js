import {
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
  Table_delivery
} from "../Components/index";
import { TrackingContext } from "../Conetxt/TrackingContext";
import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import  { useRouter } from "next/router";


export default function Delivery({ Component, pageProps }) {

  const {
    currentUser,
    createShipment,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,
  } = useContext(TrackingContext);
  const router = useRouter()
  const { id } = router.query;
  const index = 0;

  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [allShipmentsdata, setallShipmentsdata] = useState();
  useEffect(() => {
      const getCampaignsData = getAllShipment();
  
      return async () => {
        const allData = await getCampaignsData;
        setallShipmentsdata(allData);
      };
    }, []);

  return (
    <>
      <Table_delivery
              setCreateShipmentModel={setCreateShipmentModel}
              allShipmentsdata={allShipmentsdata}
      />
    </>
  );
};
