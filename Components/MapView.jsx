import { useEffect } from 'react';

const MapView = ({ sourceLat, sourceLng, destLat, destLng }) => {
  useEffect(() => {
    // Initialize the map after the component mounts
    function initMap() {
      const pointA = new google.maps.LatLng(destLat, destLng);
      const pointB = new google.maps.LatLng(sourceLat, sourceLng);

      const mapOptions = {
        zoom: 10,
        center: pointA,
      };

      const map = new google.maps.Map(document.getElementById('map'), mapOptions);

      // Instantiate a directions service
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({ map, suppressMarkers: true, });

      // Create markers
      const markerA = new google.maps.Marker({
        position: pointA,
        title: 'Source Location',
        map: map,
        icon: {
          url: '/img/marker_pin.png',
          size: new google.maps.Size(64, 64),         // Define original size of the icon
          scaledSize: new google.maps.Size(64, 64),   // Define scaled size to adjust the icon size on the map
          
          shadow: null      // Set the anchor point (where the marker "sticks" to the map)
      },
    });
      
      const markerB = new google.maps.Marker({
        position: pointB,
        title: 'Source Location',
        map: map,
        icon: {
          url: '/img/marker.png',
          size: new google.maps.Size(64, 64),         // Define original size of the icon
          scaledSize: new google.maps.Size(64, 64),   // Define scaled size to adjust the icon size on the map
          
          shadow: null      // Set the anchor point (where the marker "sticks" to the map)
      },
      
      });

      // Calculate and display the route
      calculateAndDisplayRoute(directionsService, directionsRenderer, pointA, pointB);
    }

    function calculateAndDisplayRoute(directionsService, directionsRenderer, pointA, pointB) {
      directionsService.route(
        {
          origin: pointA,
          destination: pointB,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(response);
          } else {
            console.error('Directions request failed due to ' + status);
          }
        }
      );
    }

    // Load the Google Maps API and initialize the map
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCg4BOAiSoQxSGdzayh9wlyg3vU3Puuu7E&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = initMap;
    document.head.appendChild(script);

    return () => {
      // Clean up the script and map initialization
      document.head.removeChild(script);
    };
  }, [sourceLat, sourceLng, destLat, destLng]);

  return (
    <div class="flex items-center justify-center ">
      <div id="map" style={{ width: '80%', height: '400px' }} class="border-solid border-2 border-sky-500 rounded-lg"></div>
    </div>
  );
};

export default MapView;
