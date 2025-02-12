import {useEffect, useContext,  useState } from "react";
import { AdminContext } from '../Context/AdminContext';

export default ({
  
  setCreateShipmentModel,
  createShipmentModel,
  createShipment,
}) => {
  const [shipment, setShipment] = useState({
    receiver: "",
    pickupTime: "",
    distance: "",
    price: "",
    start: "",
    destination: ""
  });
    const { getAllAdmins }  = useContext(AdminContext)

  // DropDowns in inputs: 
  const [selectedShop, setSelectedShop] = useState("");
  const [Alladmins, setAllAdmins] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [addresses, setAddresses] = useState("");
  const [shops, setShops] = useState([]);

  
  const resetAllStates = () => {
    setAdmins([]);
    setSelectedShop("");
    setAddresses("");
  };

  //fetch all admins
  useEffect(() => {
    const fetchData = async () => {
      const adminsData = await getAllAdmins();
      setAllAdmins(adminsData);
    };

    fetchData();

    fetch("/shops.json") // Ensure shops.json is in the public folder
    .then((response) => response.json())
    .then((data) => setShops(data))
    .catch((error) => console.error("Error fetching shops:", error));

    
  }, []);
  

 
  console.log("Admins data:", admins);
  
  const getAdminByStore = (storeName) => {
    return Alladmins.filter((admin) => admin.storeName === storeName);
  };
  
  // Handle Shop Selection
  const handleShopChange = (e) => {
    const storeName = e.target.value;
    setSelectedShop(storeName);
  
    // Find selected shop data
    const selectedShopData = getAdminByStore(storeName);
    console.log("xyz: ", selectedShopData);
    if (selectedShopData) {
      console.log(selectedShopData.email);
      
      setAdmins(selectedShopData.map((admin) => admin)); // Update admins dropdown
      setAddresses(); // Reset addresses until admin is selected
    }
  };
  
  // Handle Admin Selection
  const handleAdminChange = (e) => {
    const adminEmail = e.target.value;
  
    // Find admin data to set corresponding address
    const selectedAdminData = admins.find((admin) => admin.email === adminEmail);
  
    if (selectedAdminData) {
      setAddresses(selectedAdminData.walletAddress); // Only one address per admin
      
    }
    else{
      setAddresses("")
    }
  };

  useEffect(() => {
    console.log("Value changed to:", addresses);
    setShipment({ 
      ...shipment,
        receiver: addresses,
    })
  }, [addresses]);


 
  const createItem = async () => {
    try {
      await createShipment(shipment);
    } catch (error) {
      console.log("Wrong creating item");
    }
  };
  return createShipmentModel ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setCreateShipmentModel(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => {
                          setCreateShipmentModel(false) 
                          resetAllStates()
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
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <p className="text-2xl font-medium text-gray-800">
              Create Shipment
            </p>
            
            <form onSubmit={(e) => e.preventDefault()}>

                {/* Shop Selection */}
                <div className="relative mt-3">
                  <select
                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    onChange={handleShopChange}
                    value={selectedShop}
                  >
                    <option value="" disabled>Select Shop</option>
                    {shops.map((shop) => (
                      <option key={shop.shopName} value={shop.shopName}>{shop.shopName}</option>
                    ))}
                  </select>
                </div>

                {/* Receiver Admin Dropdown (Appears after shop selection) */}
                {selectedShop && (
                  <div className="relative mt-3">
                    <select
                      className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                      onChange={handleAdminChange }
                      value={shipment.receiverAdmin}
                    >
                      <option value="" >Select Receiver Admin</option>
                      {console.log(admins)}
                      {admins.map((admin) => (
                        <option key={admin.email} value={admin.email}>{admin.email}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Receiver Address Dropdown (Appears after admin selection) */}
                {addresses && (
                  <div className="relative mt-3">
                    <input
                      className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                      value={addresses}
                      disabled
                      
                    >
            
                    </input>
                  </div>
                )}

              <div className="relative mt-3">
                <input
                  type="date"
                  placeholder="pickupTime"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      pickupTime: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="distance"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      distance: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="price"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="start"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      start: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="destination"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      destination: e.target.value,
                    })
                  }
                />
              </div>

              <button
                onClick={() => {
                  

                  createItem()
                   
                }}
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
              >
                Create Shipment
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
