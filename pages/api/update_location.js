import Location from "../../Model/Location"
import connectDB from "../lib/connectDB";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { index, latitude, longitude } = req.body;

  if (!index || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    await connectDB();
    console.log(latitude, longitude);
    

    const existingRecord = await Location.findOne({ index });
    if (!existingRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }
    console.log(">>>>");
    console.log(existingRecord);
    console.log(">>>>");
    
    
    

    existingRecord.currentLatitude = latitude;
    existingRecord.currentLongitude = longitude;
    console.log(await existingRecord.save());

    res.status(200).json({ message: 'Coordinates updated successfully' });
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
