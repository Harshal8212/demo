import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

//INTERNAL IMPORT
import tracking from "./Tracking.json";
const ContractAddress = process.env.NEXT_PUBLIC_TRACKING_CONTRACT_ADDRESS;
const ContractABI = tracking.abi;

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
  //STATE VARIABLE
  const DappName = "Product Tracking Dapp";
  const [currentUser, setCurrentUser] = useState("");

  const createShipment = async (items) => {
    console.log(items);
    const { receiver, pickupTime, distance, price, start, destination } = items;

    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      console.log("kashjdfmdfasjfsajfjsddsjfghfjsdghf");
      
      const createItem = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        ethers.utils.parseUnits(price, 18),
        start,
        destination,
        {
          value: ethers.utils.parseUnits(price, 18),
     
        }
      );
      console.log("Sending value:", ethers.utils.parseUnits(price, 18).toString());

      await createItem.wait();
      console.log("Create Item", createItem);
      location.reload();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const getAllShipment = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
      const contract = fetchContract(provider);
      
      const shipments = await contract.getAllTransactions();
      console.log("ALL Shipmentsdasaf", shipments);
      
      const allShipments = shipments.map((shipment) => ({
        sender: shipment.sender,
        receiver: shipment.receiver,
        price: ethers.utils.formatEther(shipment.price.toString()),
        pickupTime: shipment.pickupTime.toNumber(),
        deliveryTime: shipment.deliveryTime.toNumber(),
        distance: shipment.distance.toNumber(),
        start: shipment.start,
        destination: shipment.destination,
        isPaid: shipment.isPaid,
        status: shipment.status,
      }));
     
      

      return allShipments;
    } catch (error) {
      console.log("Error occurred while getting shipments", error);
    }
  };

  const getShipmentsCount = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipmentsCount = await contract.getShipmentsCount(accounts[0]);
      return shipmentsCount.toNumber();
    } catch (error) {
      console.log("Error occurred while getting shipment count", error);
    }
  };

  const completeShipment = async (completeShip) => {
    console.log(completeShip);
    console.log("djdfjefdfjbdnfdsmfb");
    const { receiver, index } = completeShip;
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
     
      
      const transaction = await contract.completeShipment(
        accounts[0],
        receiver,
        index,
        {
          gasLimit: 300000,
        }
      );
      console.log(accounts[0]);
      
      await transaction.wait();
      console.log(transaction);
      location.reload();
    } catch (error) {
      console.log("Error occurred while completing shipment", error);
    }
  };

  const getShipment = async (index) => {
    console.log(index * 1);
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
      const contract = fetchContract(provider);
      const shipment = await contract.getShipment(index * 1);
      console.log("shipemnt" , shipment);
      
      const SingleShipment = {
        sender: shipment[1],
        receiver: shipment[2],
        pickupTime:shipment[3].toNumber(),
        deliveryTime: shipment[4].toNumber(),
        distance: shipment[5].toNumber(``),
        price: ethers.utils.formatEther(shipment[6].toString()),
        start: shipment[7],
        destination: shipment[8],
        status: shipment[9],
        isPaid: shipment[10],
      };
      console.log("single ", SingleShipment);
      

      return SingleShipment;
    } catch (error) {
      console.log("Error occurred while fetching shipment", error);
    }
  };

  const startShipment = async (getProduct) => {
    const { receiver, index } = getProduct;

    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
     
      

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      console.log(receiver);
      
      const shipment = await contract.startShipment(
       
        index,
        {
          gasLimit: 300000,
        }
      );
     
      await shipment.wait();
      console.log(shipment);
      location.reload();
    } catch (error) {
      console.log("Error occurred while starting shipment", error);
    }
  };

  //---CHECK WALLET CONNECTED
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentUser(accounts[0]);
      } else {
        return "No account";
      }
    } catch (error) {
      return "Not connected";
    }
  };

  //---CONNECT WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected!");
      setCurrentUser(accounts[0]);
    } catch (error) {
      return "Something went wrong";
    }
  };

  //---DISCONNECT WALLET FUNCTION
  const disconnectWallet = async () => {
    try {
      setCurrentUser(""); // Reset the current user to an empty string
      console.log("Disconnected from wallet");
    } catch (error) {
      console.log("Error occurred while disconnecting wallet", error);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        createShipment,
        getAllShipment,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentsCount,
        DappName,
        currentUser,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};