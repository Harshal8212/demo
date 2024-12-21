// pages/api/getTrackingInfo.js

import dbConnect from '../lib/connectDB';
import Location from '../../Model/Location';

export default async function handler(req, res) {
  try {
    await dbConnect(); // Ensure a database connection
    const { index } = req.query; // Access `index` from the request query

    // Find the document by `index`
    const trackingInfo = await Location.findOne({ index });

    if (!trackingInfo) {
      return res.status(404).json({ error: 'Tracking information not found' });
    }

    // Send the retrieved document as the response
    res.status(200).json({ success: true, data: trackingInfo });
  } catch (error) {
    console.error('Error fetching tracking information:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
