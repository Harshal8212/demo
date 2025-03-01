import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";



// ABI and Contract Details
import adminContract from "./AdminLogin.json";

import contractAddresses from "./contract-addresses.json";
const contractAddress = contractAddresses[0].AdminLogin;
const contractABI = adminContract.abi;

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const res = await fetch("/api/auth/session");
    const data = await res.json();
    if (data.user) {
      setUser(data.user);
    }
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

  const registerAdmin = async (email, phoneNumber, storeName, walletAddress, password) => {
    try {
      const contract = await fetchContract();
      const tx = await contract.registerAdmin(email, phoneNumber, storeName, walletAddress, password);
      await tx.wait();
      console.log("Admin registered:", email);
      return { success: true, message: "Admin registered successfully" };
    } catch (error) {
      console.error("Error registering admin:", error);
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
        const res = await fetch("/api/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Failed to create session');
        }
        const data = await res.json();
        setUser({ email, isLoggedIn: true });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error validating login:", error);
      throw error;
    }
  };

  const Logout = async () => {
    try {
      
      const res = await fetch("/api/auth/session", { method: "DELETE" });
      
      
      if (res.ok) {
        setUser(null);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Remove Admin by Email
  const removeAdminByEmail = async (email) => {
    try {
      const contract = await fetchContract();
      const tx = await contract.removeAdminByEmail(email);
      await tx.wait();
      console.log("Admin removed by email:", email);
      return true;
    } catch (error) {
      console.error("Error removing admin by email:", error);
      throw error;
    }
  };

  // Get Admin Info by Email
  const getAdminByEmail = async (email) => {
    try {
      const contract = await fetchContract();
      const adminInfo = await contract.getAdminByEmail(email);
      console.log("Admin info retrieved:", adminInfo);
      return {
        email: adminInfo[0],
        phoneNumber: adminInfo[1],
        storeName: adminInfo[2]
      };
    } catch (error) {
      console.error("Error fetching admin info by email:", error);
      throw error;
    }
  };

  // Get All Admins
  const getAllAdmins = async () => {
    try {
      const contract = await fetchContract();
      const admins = await contract.getAllAdmins();
      console.log("All admins data:", admins);
  
      // Destructure each admin array to create a formatted object
      return admins.map(([email, phoneNumber, storeName, walletAddress]) => ({
        email,
        phoneNumber,
        storeName,
        walletAddress,
      }));
    } catch (error) {
      console.error("Error fetching all admins:", error);
      throw error;
    }
  };
  
  
  // Check if email is registered
  const isEmailRegistered = async (email) => {
    try {
      const contract = await fetchContract();
      const isRegistered = await contract.isEmailRegistered(email);
      console.log("Is email registered:", isRegistered);
      return isRegistered;
    } catch (error) {
      console.error("Error checking if email is registered:", error);
      throw error;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        connectWallet,
        registerAdmin,
        validateLogin,
        Logout,
        removeAdminByEmail,
        getAdminByEmail,
        getAllAdmins,
        isEmailRegistered,
        currentAccount,
        user,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

