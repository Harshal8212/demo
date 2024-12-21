import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
export default ({ getShipment }) => {
  const [index, setIndex] = useState(0);
  const [singleShipmentData, setSingleShipmentData] = useState();

  const router = useRouter()
  const {id} = router.query;
  setIndex(id)
  useEffect(() => {
    getShipment(index)
      .then((getData) => {
        setSingleShipmentData(getData);
        console.log(getData);
      })
      .catch((error) => {
        console.error("Error fetching shipment data:", error);
      });
  }, [index, getShipment]); // Runs whenever `index` or `getShipment` changes

  return (
    <>
      {singleShipmentData === undefined ? (
        ""
      ) : (
        <>
          <h1>Start: {singleShipmentData.start}</h1>
          <h1>Destination: {singleShipmentData.destination}</h1>
        </>
      )}
    </>
  );
};
