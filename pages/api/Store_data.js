'use server'

import { redirect } from 'next/navigation';
import Location from "../../Model/Location";
import connectDB from "../lib/connectDB";

export default async function handler(req, res) {
  await connectDB();

  const {
    index,
    start,
    destination,
    latitude,
    longitude,
    destination_latitude,
    destination_longitude
  } = req.body;

  try {
    // Use findOneAndUpdate with upsert to either update an existing record or create a new one
    const updatedLocation = await Location.findOneAndUpdate(
      { index: index }, // Filter by index
      {
        $set: {
          start: start,
          destination: destination,
          currentLatitude: latitude,
          currentLongitude: longitude,
          destinationLatitude: destination_latitude,
          destinationLongitude: destination_longitude,
        },
      },
      { new: true, upsert: true } // new: return the updated document, upsert: create if not exists
    );
  
    console.log("Record updated/created:", updatedLocation);

    res.status(200).json({ done: true, data: updatedLocation });
    
  } catch (error) {
    console.error("Error handling the request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
 
}
