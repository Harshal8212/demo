import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import BigBlueButton from "./Desgin_components/BigBlueButton";
import { 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Box 
} from '@mui/material'
import useGeolocation from "./GeolocationComponent";
import {
    setDefaults,
    fromAddress
  } from "react-geocode";


export default ({ getShipment }) => {
  const [index, setIndex] = useState(0);
  const [singleShipmentData, setSingleShipmentData] = useState();
  const { loading, error, latitude, longitude } = useGeolocation();
  const [destination, setDestination] = useState("")  
  const [destination_latitude, setDestinationLatitude] = useState(null);
  const [destination_longitude, setDestinationLongitude] = useState(null);
  const router = useRouter()
  const {id} = router.query;

  
  //shipent with that index
  useEffect(() => {
    setIndex(id)
    getShipment(index)
      .then((getData) => {
        setSingleShipmentData(getData);
        setDestination(getData.destination)
        console.log(getData);
      })
      .catch((error) => {
        console.error("Error fetching shipment data:", error);
      });
  }, [index, getShipment]); // Runs whenever `index` or `getShipment` changes


  //destination Coordinates
   
    setDefaults({
        key: "AIzaSyCg4BOAiSoQxSGdzayh9wlyg3vU3Puuu7E", // Your API key here.
        language: "en", // Default language for responses.
        region: "in", // Default region for responses.
    });

    useEffect(() => {
        const fetchGeocode = async () => {
          if (!destination) {
            setDestinationLatitude(null);
            setDestinationLongitude(null);
           
            return;
          }
    
          try {
            fromAddress(destination)
            .then(({ results }) => {
              const { lat, lng } = results[0].geometry.location;
              setDestinationLatitude(lat);
              setDestinationLongitude(lng);
              console.log(lat, lng);
            })
            .catch(console.error);
            
            
          } catch (err) {
            setDestinationLatitude(null);
            setDestinationLongitude(null);
            console.log(err.message || "Failed to fetch geolocation.");
          }
        };
    
        fetchGeocode();
      }, [destination]);



  //handling middleware
  const handleClick = async () => {
    const start = singleShipmentData.start
    const destination = singleShipmentData.destination
    try {
      const response = await fetch("/api/Store_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          index,
          start,
          destination,
          latitude,
          longitude,
          destination_latitude,
          destination_longitude,
        
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response from server:", data);
      alert("UPDATED");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to contact middleware");
    }
  };
  return (
    <>
      {singleShipmentData === undefined ? (
        ""
      ) : (
        <>
           <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shipment Tracker
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Shipment Details
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Current Location
              </Typography>
              <Typography>Latitude: {latitude}</Typography>
              <Typography>Longitude: {longitude}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Destination
              </Typography>
              <Typography>Latitude: {destination_latitude}</Typography>
              <Typography>Longitude: {destination_longitude}</Typography>
              <Typography>Location: {destination}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Route
          </Typography>
          <Typography>Start: {singleShipmentData.start}</Typography>
          <Typography>End: {destination}</Typography>
        </Box>
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <BigBlueButton onClick={handleClick}>
          Track Shipment
        </BigBlueButton>
      </Box>
    </Container>
        </>
      )}
    </>
  );
};
