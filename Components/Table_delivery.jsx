import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default ({ setCreateShipmentModel, allShipmentsdata, currentUser, pickUpShipment , getShipmentsByDeliveryPerson}) => {
  const router = useRouter();

  const [PickedUpShipements, setPickedUpShipements] = useState(null)
  const converTime = (time) => {
    const newTime = new Date(time);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);
  };

  useEffect(()=> {
    if (currentUser) {
      const fetchShipments = async () => {
        
        const allData = await getShipmentsByDeliveryPerson(currentUser);
        console.log("All data", allData);
        
        setPickedUpShipements(allData);
      };
      fetchShipments();
    }

  }, [getShipmentsByDeliveryPerson])

  const handlePickUp = async (id) => {
    if (id >= 0) {
      pickUpShipment(id, currentUser);
    } else {
      alert("Invalid ID");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Track Shipment 
          </h3>
        </div>
      </div>

      {/* Table for Status 1 - Available for Pickup */}
      <h4 className="text-lg font-semibold mt-6">Available for Pickup</h4>
      <div className="mt-4 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">PickupTime</th>
              <th className="py-3 px-6">Source</th>
              <th className="py-3 px-6">Destination</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {allShipmentsdata?.map((shipment, idx) => (
              shipment.status === 1 ? (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">{idx}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{converTime(shipment.pickupTime)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{shipment.start}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{shipment.destination}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handlePickUp(idx)}
                      className="px-4 py-2 text-white bg-gray-800 hover:bg-gray-700 rounded-lg"
                    >
                      Pick Up
                    </button>
                  </td>
                </tr>
              ) : null
            ))}
          </tbody>
        </table>
      </div>

      {/* Table for Status 2 - In Transit */}
      <h4 className="text-lg font-semibold mt-6">Shipment assigned to {currentUser}</h4>
      <div className="mt-4 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">PickupTime</th>
              <th className="py-3 px-6">Source</th>
              <th className="py-3 px-6">Destination</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Current Location</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {PickedUpShipements?.map((shipment) => (
              shipment.status === 2 ? (
                <tr key={shipment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{shipment.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{converTime(shipment.pickupTime)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{shipment.start}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{shipment.destination}</td>
                  <td className="px-6 py-4 whitespace-nowrap">IN TRANSIT</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => window.open(`/delivery/getCoordinates/${shipment.id}`, '_blank')}
                      className="px-4 py-2 text-white bg-gray-800 hover:bg-gray-700 rounded-lg"
                    >
                      Add Location
                    </button>
                  </td>
                </tr>
              ) : null
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
