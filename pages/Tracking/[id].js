// pages/track/[index].js

import { useRouter } from "next/router";
import { MapView, ShippingStatus } from "../../Components/index";
import React, { useState, useEffect, useContext } from "react"; // import useContext

import { TrackingContext } from "../../Context/TrackingContext"; // corrected import path

const TrackPage = ({ trackingInfo }) => {
  const { getShipment } = useContext(TrackingContext); // assuming this function is part of the context

  if (!trackingInfo) {
    return (
      <>
        <div class="flex items-center justify-center py-10">

          <h1 class="text-4xl font-bold">Tracking is not yet started</h1>

          </div>
      </>
    );
  }

  const router = useRouter();
  const { id } = router.query; // getting the `id` directly from router.query

  const [singleShipmentData, setSingleShipmentData] = useState();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (id) {
      setIndex(id); // only set index if `id` is available
      getShipment(id)
        .then((getData) => {
          setSingleShipmentData(getData);
        })
        .catch((error) => {
          console.error("Error fetching shipment data:", error);
        });
    }
  }, [id, getShipment]); // Added dependency on `id` to trigger effect when `id` changes

  return (
    <div>
      <div class="flex items-center justify-center pb-10">

        <h1 class="text-2xl font-bold">Shipment ID: {id}'s Location</h1>

      </div>
      <MapView
        sourceLat={trackingInfo.currentLatitude}
        sourceLng={trackingInfo.currentLongitude}
        destLat={trackingInfo.destinationLatitude}
        destLng={trackingInfo.destinationLongitude}
      />
      <div class="flex items-center justify-center py-10">

        <h1 class="text-2xl font-bold">Shipment ID: {id}'s Status</h1>

      </div>
      <ShippingStatus status={singleShipmentData ? singleShipmentData.status : "Loading..."} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params; // Corrected to `id`

  // Fetch data from the API route
  const response = await fetch(`${process.env.BASE_URL}/api/getTrackingInfo?index=${id}`);
  const result = await response.json();

  if (!result.success) {
    return { props: { trackingInfo: null } };
  }

  return {
    props: {
      trackingInfo: result.data,
    },
  };
}

export default TrackPage;
