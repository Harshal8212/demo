import {
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
  Table_delivery,
  DeliveryLoginPage
} from "../Components/index";
import { TrackingContext } from "../Context/TrackingContext";
import { DeliveryContext } from "../Context/DeliveryContext";
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

  const {deliveryPerson} = useContext(DeliveryContext)

 

  const router = useRouter()
  const { id } = router.query;
  const index = 0;

  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [allShipmentsdata, setallShipmentsdata] = useState();
  useEffect(() => {
      if (deliveryPerson) {
        const fetchShipments = async () => {
          
          const allData = await getAllShipment();
          setallShipmentsdata(allData);
        };
        fetchShipments();
      }
      
    }, [deliveryPerson, getAllShipment]);
    console.log("deliveryPerson:", deliveryPerson); // ✅ Debugging output

if (!deliveryPerson) {
  return <DeliveryLoginPage />;
}

    if(deliveryPerson){
      return (
        <>
        
          <Table_delivery
                  setCreateShipmentModel={setCreateShipmentModel}
                  allShipmentsdata={allShipmentsdata}
          />
        </>
      );
    }
    return < DeliveryLoginPage />

};
