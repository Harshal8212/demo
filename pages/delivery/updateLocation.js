'use client';

import { useState, useEffect } from 'react';
import { MapPin, AlertCircle, Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function LocationUpdater() {
  const [index, setIndex] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  

  useEffect(() => {
      if (navigator.geolocation) {
          const options = {
              enableHighAccuracy: true,
              timeout: Infinity,
              maximumAge: 0,
          };

          const watchId = navigator.geolocation.watchPosition(
              (position) => {
                  const { latitude, longitude } = position.coords;
                  setLatitude(latitude)
                  setLongitude(longitude)

              },
              (err) => setError(err.message),
              options
          );

          // Cleanup the geolocation watcher
          return () => navigator.geolocation.clearWatch(watchId);
      } else {
          setError('Geolocation is not supported by your browser.');
      }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    if (!index || latitude === null || longitude === null) {
      setError('Please provide an index and ensure geolocation is enabled.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('../api/update_location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index, latitude, longitude }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.error || 'An error occurred while updating the location.');
      }
    } catch (err) {
      setError('An error occurred while updating the location.');
    } finally {
      setLoading(false);
    }
  };

  
  const isGeolocationEnabled = latitude !== null && longitude !== null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-md w-full space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">Live Location Tracker</h1>

         

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="index" className="block text-sm font-medium text-gray-700 mb-1">
              Index:
            </label>
            <input
              id="index"
              type="text"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
            />
          </div>

          <div className="bg-gray-50 rounded-md p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-gray-600 flex flex-col sm:flex-row sm:items-center">
              <MapPin className="mr-0 mb-1 sm:mb-0 sm:mr-2 text-blue-500" />
              <span className="sm:mr-2">Latitude: {latitude !== null ? latitude.toFixed(6) : 'Fetching...'}</span>
              <span className="hidden sm:inline">|</span>
              <span className="sm:ml-2">Longitude: {longitude !== null ? longitude.toFixed(6) : 'Fetching...'}</span>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !isGeolocationEnabled}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Updating...
              </>
            ) : (
              'Update Location'
            )}
          </button>
        </form>

        {message && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 sm:p-4 flex items-center"
            role="alert"
          >
            <CheckCircle className="mr-2 flex-shrink-0" />
            <p className="text-sm sm:text-base">{message}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 sm:p-4 flex items-center" role="alert">
            <XCircle className="mr-2 flex-shrink-0" />
            <p className="text-sm sm:text-base">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
