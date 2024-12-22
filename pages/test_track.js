// pages/index.js
import { useEffect, useState } from 'react';

export default function Home() {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
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
                    setLocation({ latitude, longitude });
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

    return (
        <>
          
                <div className="container text-center">
                    <style jsx>{`
                        .btn-danger {
                            margin-top: 200px;
                            padding: 105px 50px;
                            border-radius: 50%;
                        }
                    `}</style>
                    <button className="btn btn-danger">Product Tracking Now</button>
                    <p id="result">
                        {location.latitude && location.longitude ? (
                            <>
                                <b>Latitude:</b> {location.latitude} <b>Longitude:</b> {location.longitude}
                            </>
                        ) : (
                            error || 'Fetching location...'
                        )}
                    </p>
                </div>
        
        </>
    );
}
