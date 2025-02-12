import React, { useState, useEffect, useContext } from "react";

// INTERNAL IMPORT
import {
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
  LoginPage,
} from "../Components/index";
import { TrackingContext } from "../Context/TrackingContext";
import { AdminContext } from '../Context/AdminContext';

const Index = () => {
  const {
    currentUser,
    createShipment,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,
  } = useContext(TrackingContext);

  const { 
    registerAdmin,
    validateLogin,
    logout,
    removeAdminByEmail,
    getAdminByEmail,
    getAllAdmins,
    isEmailRegistered,
    currentAccount,
    user } = useContext(AdminContext);
    

  // STATE VARIABLES
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModel, setGetModel] = useState(false);

  // DATA STATE VARIABLE
  const [allShipmentsdata, setallShipmentsdata] = useState([]);

  useEffect(() => {
    
    if (user) {
      const fetchShipments = async () => {
        
        const allData = await getAllShipment();
        setallShipmentsdata(allData);
      };
      fetchShipments();
    }
  }, [user, getAllShipment]);

  
  

  // Render the login page if the user is not logged in
  if (user ) {
    
    return (
      <>
        <Services
          setOpenProfile={setOpenProfile}
          setCompleteModal={setCompleteModal}
          setGetModel={setGetModel}
          setStartModal={setStartModal}
        />
  
        <Table
          setCreateShipmentModel={setCreateShipmentModel}
          allShipmentsdata={allShipmentsdata}
        />
        <Form
          createShipmentModel={createShipmentModel}
          createShipment={createShipment}
          setCreateShipmentModel={setCreateShipmentModel}
        />
        <Profile
          openProfile={openProfile}
          setOpenProfile={setOpenProfile}
          currentUser={currentUser}
          getShipmentsCount={getShipmentsCount}
          user={user}
        />
        <CompleteShipment
          completeModal={completeModal}
          setCompleteModal={setCompleteModal}
          completeShipment={completeShipment}
          getShipment = {getShipment}
        />
        <GetShipment
          getModel={getModel}
          setGetModel={setGetModel}
          getShipment={getShipment}
        />
        <StartShipment
          startModal={startModal}
          setStartModal={setStartModal}
          startShipment={startShipment}
          getShipment = {getShipment}
        />
      </>
    );
  }

  

  return <LoginPage />;
};

export default Index;

