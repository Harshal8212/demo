import { useRouter } from "next/router";
import { useState , useEffect} from "react";



export default ({ index }) => {
  const router = useRouter();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  
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
                if (!position.coords) {
                  alert("Fetching your location...");
                  return;
                }
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

  const handleClick = () => {
    

   

    // Redirect to the coordinates page
    setLoading(true);
    router.push({
      pathname: `/delivery/${index}`,
      query: { latitude: latitude, longitude: longitude },
    });
  };

  return (
    <div>
        <div className="flex justify-center pb-5">
        <h1 className="py-5  text-5xl">Click on below button to get current Co-ordinates</h1>
        </div>
      
        <div className="flex justify-center">
             
            <button 
                onClick={handleClick} disabled={loading} 
                className="bg-blue-700 text-white py-10 px-10 rounded-lg hover:bg-blue-900 transition duration-300 text-xl"
            >
            {loading ? "Redirecting..." : "Get Current Locations"}
        </button>
    </div>
      
    </div>
  );
};

