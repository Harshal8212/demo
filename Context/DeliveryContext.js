import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";

// ABI and Contract Details
import deliveryContract from "./DeliveryManLogin.json";
const contractAddress = process.env.NEXT_PUBLIC_DELIVERYMAN_CONTRACT_ADDRESS;
const contractABI = deliveryContract.abi;

export const DeliveryContext = createContext();

export const DeliveryProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [deliveryPerson, setdeliveryPerson] = useState(null);
    useEffect(() => {
        checkSession();
    }, []);

  const checkSession = async () => {
    const res = await fetch("/api/auth/session_for_deliveryMan");
    const data = await res.json();
    if (data.user) {
     
      
        setdeliveryPerson(data.user);
    }
    console.log(data);
    
  };

  const fetchContract = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(contractAddress, contractABI, signer);
      } else {
        throw new Error("Please install MetaMask!");
      }
    } catch (error) {
      console.error("Error fetching contract:", error);
      throw error;
    }
  };

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setCurrentAccount(address);
        console.log("Wallet connected:", address);
      } else {
        throw new Error("Please install MetaMask!");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      throw error;
    }
  };

  const registerDeliveryMan = async (email, phoneNumber, vehicleType, password) => {
    try {
      const contract = await fetchContract();
      const tx = await contract.registerDeliveryMan(email, phoneNumber, vehicleType, password);
      await tx.wait();
      console.log("DeliveryMan registered:", email);
      return { success: true, message: "DeliveryMan registered successfully" };
    } catch (error) {
      console.error("Error registering delivery man:", error);
      if (error.message.includes("EmailAlreadyRegistered")) {
        return { success: false, message: "This email is already registered" };
      }
      return { success: false, message: "An error occurred while registering. Please try again." };
    }
  };

  const validateLogin = async (email, password) => {
    try {
      const contract = await fetchContract();
      const isValid = await contract.validateLogin(email, password);
      if (isValid) {
        const res = await fetch("/api/auth/session_for_deliveryMan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ delivery_Person_email:email }),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to create session');
        }
        const data = await res.json();
        setdeliveryPerson({ email, isLoggedIn: true });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error validating login:", error);
      throw error;
    }
  };

  const removeDeliveryManByEmail = async (email) => {
    try {
      const contract = await fetchContract();
      const tx = await contract.removeDeliveryManByEmail(email);
      await tx.wait();
      console.log("DeliveryMan removed by email:", email);
      return true;
    } catch (error) {
      console.error("Error removing delivery man by email:", error);
      throw error;
    }
  };

  const getDeliveryManByEmail = async (email) => {
    try {
      const contract = await fetchContract();
      const deliveryManInfo = await contract.getDeliveryManByEmail(email);
      console.log("DeliveryMan info retrieved:", deliveryManInfo);
      return {
        email: deliveryManInfo[0],
        phoneNumber: deliveryManInfo[1],
        vehicleType: deliveryManInfo[2],
      };
    } catch (error) {
      console.error("Error fetching delivery man info by email:", error);
      throw error;
    }
  };

  const getAllDeliveryMen = async () => {
    try {
      const contract = await fetchContract();
      const deliveryMen = await contract.getAllDeliveryMen();
      return deliveryMen.map(([email, phoneNumber, vehicleType]) => ({
        email,
        phoneNumber,
        vehicleType,
      }));
    } catch (error) {
      console.error("Error fetching all delivery men:", error);
      throw error;
    }
  };

  const isEmailRegistered = async (email) => {
    try {
      const contract = await fetchContract();
      const isRegistered = await contract.isEmailRegistered(email);
      return isRegistered;
    } catch (error) {
      console.error("Error checking if email is registered:", error);
      throw error;
    }
  };

  return (
    <DeliveryContext.Provider
      value={{
        connectWallet,
        registerDeliveryMan,
        validateLogin,
        removeDeliveryManByEmail,
        getDeliveryManByEmail,
        getAllDeliveryMen,
        isEmailRegistered,
        currentAccount,
        deliveryPerson
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};
