import { useEffect, useState } from "react";

export default ({ completeModal, setCompleteModal, completeShipment, getShipment }) => {
  const [completeShip, setCompleteShip] = useState({
    receiver: "",
    index: "",
  });
  const [index, setIndex] = useState("");
  const [error, setError] = useState("");

  const resetAllStates = () => {
    setIndex("");
    setError("");
  };

  useEffect(() => {
    const fetchReceiverAddress = async () => {
      if (!index) return; // Prevent API calls when index is empty

      try {
        const shipment = await getShipment(index);
        console.log(shipment);

        if (shipment.status !== 2) {
          if(shipment.status === 0)
          setError(`Shipment NOT Started (Status: PENDING)`);
          if(shipment.status === 2)
            setError("Shipment Not Yet Picked (Status: PICK_UP)")
          if(shipment.status === 3)
            setError("Shipment already Completed (Status: COMPLETED)")
          return;
        }

        setError(""); // Clear error if status is pending
        setCompleteShip({
          receiver: shipment.receiver,
          index: index,
        });
      } catch (err) {
        setError("Error fetching shipment details.");
        console.error(err);
      }
    };

    fetchReceiverAddress();
  }, [index, getShipment]);

  const changeStatus = async () => {
    if (!completeShip.index) {
      setError("Please provide a valid shipment ID.");
      return;
    }
    try {
      await completeShipment(completeShip);
      setError(""); // Clear errors after successful status change
    } catch (error) {
      setError("Error completing shipment. Please try again.");
      console.error(error);
    }
  };

  return completeModal ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => {setCompleteModal(false)
          resetAllStates();
        }}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() =>{ setCompleteModal(false)
                resetAllStates();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a 1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a 1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a 1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">
              Complete Shipment
            </h4>

          
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="number"
                  placeholder="ID OF SHIPMENT"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setIndex(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-base mt-2">{error}</p>}


              <button
                onClick={() => changeStatus()}
                disabled={!!error}
                className={`block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white rounded-lg ring-offset-2 focus:ring-2 ${
                  error
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 ring-indigo-600"
                }`}
              >
                 Complete Shipment
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
