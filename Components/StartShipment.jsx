import { useEffect, useState } from "react";
import { Str1 } from "../Components/index";

export default ({ startModal, setStartModal, startShipment, getShipment }) => {
  const [index, setIndex] = useState("");
  const [error, setError] = useState("");
  const [getProduct, setGetProduct] = useState({
    receiver: "",
    index: "",
  });

  const resetAllStates = () => {
    setIndex("");
    setError("");
  };

  useEffect(() => {
    const fetchReceiverAddress = async () => {
      if (!index) return; // Prevents unnecessary API calls if index is empty

      try {
        const shipment = await getShipment(index);
        console.log(shipment);

        if (shipment.status !== 0) {
          if(shipment.status === 1)
          setError(`Shipment already started (Status: PICK_UP)`);
          if(shipment.status === 2)
            setError("Shipment already Completed (Status: IN_TRANSIT)")
          if(shipment.status === 3)
            setError("Shipment already Completed (Status: COMPLETED)")
          return;
        }

        setError(""); // Clear error if status is "Pending"

        setGetProduct({
          receiver: shipment.receiver,
          index: index,
        });
      } catch (err) {
        setError("Error fetching shipment details.");
        console.error(err);
      }
    };

    fetchReceiverAddress();
  }, [index, getShipment]); // Ensure getShipment is a dependency

  const startShipping = () => {
    if (!getProduct.index) {
      setError("Please provide a valid shipment ID.");
      return;
    }
    if (error) return; // Prevents starting if error exists
    startShipment(getProduct);
  };

  return startModal ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => {setStartModal(false)
          resetAllStates();
        }}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => {setStartModal(false)
                resetAllStates();
              }}
            >
              <Str1 />
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">
              Start The Shipping
            </h4>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="ID  OF SHIPMENT"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setIndex(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-red-500 text-base mt-2">{error}</p>
              )}

              <button
                onClick={startShipping}
                disabled={!!error}
                className={`block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white rounded-lg ring-offset-2 focus:ring-2 ${
                  error
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 ring-indigo-600"
                }`}
              >
                Start Shipping
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
