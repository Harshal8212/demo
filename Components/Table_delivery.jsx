import { useRouter } from "next/router";

export default ({ setCreateShipmentModel, allShipmentsdata }) => {

    const router = useRouter()


    const converTime = (time) => {
      const newTime = new Date(time);
      const dataTime = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(newTime);
  
      return dataTime;
    };

    const isNotComplete = (status) => {
      if(status == 0 || status == 1){
        return true;
      }
      return false;
    }
  
    console.log(allShipmentsdata);
  
    return (
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Track Shipment
            </h3>
            
          </div>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">ID</th>
                
                <th className="py-3 px-6">PickupTime</th>
                <th className="py-3 px-6">Distance</th>
                <th className="py-3 px-6">Delivery Time</th>
                <th className="py-3 px-6">Paid</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6"> current Locations</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {allShipmentsdata
              ?.map((shipment, idx) => (
                shipment.status === 1 ? (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {idx}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {converTime(shipment.pickupTime)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.distance} Km
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.deliveryTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.isPaid ? " Completed" : "Not Complete"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {shipment.status == 0
                      ? "Pending"
                      : shipment.status == 1
                      ? "IN_TRANSIT"
                      : "Delivered"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  <div className="mt-3 md:mt-0">
                        <p
                            onClick={() => window.open(`/delivery/getCoordinates/${idx}`, '_blank')}
                            href="#"
                            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 md:text-sm rounded-lg md:inline-flex"
                        >
                            Add Location
                        </p>
                        

                    </div>
                  </td>
                </tr>
                ): null
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  