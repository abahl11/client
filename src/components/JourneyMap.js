// // client/src/components/JourneyMap.js
// import React, { useCallback, useState } from 'react';
// import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

// const libraries = ['places'];
// const mapContainerStyle = {
//   width: '100%',
//   height: '400px',
// };

// const JourneyMap = ({ originCoords, destinationCoords }) => {
//   const [directions, setDirections] = useState(null);
  
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries,
//   });

//   const center = useCallback(() => {
//     if (originCoords && destinationCoords) {
//       return {
//         lat: (originCoords.lat + destinationCoords.lat) / 2,
//         lng: (originCoords.lng + destinationCoords.lng) / 2,
//       };
//     }
//     return { lat: 20, lng: 0 }; // Default center
//   }, [originCoords, destinationCoords]);

//   const fetchDirections = useCallback(() => {
//     if (!originCoords || !destinationCoords) return;
    
//     const directionsService = new window.google.maps.DirectionsService();
    
//     directionsService.route(
//       {
//         origin: new window.google.maps.LatLng(originCoords.lat, originCoords.lng),
//         destination: new window.google.maps.LatLng(destinationCoords.lat, destinationCoords.lng),
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       },
//       (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           setDirections(result);
//         } else {
//           console.error(`Directions request failed: ${status}`);
//         }
//       }
//     );
//   }, [originCoords, destinationCoords]);

//   React.useEffect(() => {
//     if (isLoaded && originCoords && destinationCoords) {
//       fetchDirections();
//     }
//   }, [isLoaded, fetchDirections, originCoords, destinationCoords]);

//   if (loadError) return <div>Error loading maps</div>;
//   if (!isLoaded) return <div>Loading maps...</div>;
//   if (!originCoords || !destinationCoords) return <div>Location coordinates not available</div>;

//   return (
//     <div className="rounded-lg overflow-hidden shadow-md">
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         zoom={5}
//         center={center()}
//       >
//         {!directions && (
//           <>
//             <Marker position={originCoords} label="A" />
//             <Marker position={destinationCoords} label="B" />
//           </>
//         )}
//         {directions && <DirectionsRenderer directions={directions} />}
//       </GoogleMap>
//     </div>
//   );
// };

// export default JourneyMap;


// client/src/components/JourneyMap.js
// 



import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer, Polyline } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const JourneyMap = ({ journey }) => {
  const [directions, setDirections] = useState(null);
  const [routePath, setRoutePath] = useState([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // const center = useCallback(() => {
  //   if (journey.originCoords && journey.destinationCoords) {
  //     return {
  //       lat: (journey.originCoords.lat + journey.destinationCoords.lat) / 2,
  //       lng: (journey.originCoords.lng + journey.destinationCoords.lng) / 2,
  //     };
  //   }
  //   return { lat: 20, lng: 0 }; // Default center
  // }, [journey]);

  // In JourneyMap.js
const center = useCallback(() => {
  if (journey.originCoords && journey.originCoords.coordinates && 
      journey.destinationCoords && journey.destinationCoords.coordinates) {
    // Use GeoJSON format [lng, lat]
    return {
      lat: (journey.originCoords.coordinates[1] + journey.destinationCoords.coordinates[1]) / 2,
      lng: (journey.originCoords.coordinates[0] + journey.destinationCoords.coordinates[0]) / 2
    };
  }
  return { lat: 20, lng: 0 }; // Default center
}, [journey]);


  useEffect(() => {
    if (isLoaded && journey.route && journey.route.coordinates) {
      // Convert GeoJSON coordinates [lng, lat] to Google Maps LatLng {lat, lng}
      const path = journey.route.coordinates.map(coord => ({
        lat: coord[1],
        lng: coord[0]
      }));
      setRoutePath(path);
    }
  }, [isLoaded, journey]);

  const fetchDirections = useCallback(() => {
    if (!journey.originCoords || !journey.destinationCoords) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: new window.google.maps.LatLng(journey.originCoords.lat, journey.originCoords.lng),
        destination: new window.google.maps.LatLng(journey.destinationCoords.lat, journey.destinationCoords.lng),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Directions request failed: ${status}`);
        }
      }
    );
  }, [journey]);

  useEffect(() => {
    if (isLoaded && journey.originCoords && journey.destinationCoords) {
      fetchDirections();
    }
  }, [isLoaded, fetchDirections, journey]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;
  if (!journey.originCoords || !journey.destinationCoords) return <div>Location coordinates not available</div>;

  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={5}
        center={center()}
      >
        {!directions && (
          <>
            {/* <Marker position={journey.originCoords} label="A" />
            <Marker position={journey.destinationCoords} label="Z" /> */}
{journey.originCoords && journey.originCoords.coordinates ? (
  <Marker 
    position={{
      lat: journey.originCoords.coordinates[1],
      lng: journey.originCoords.coordinates[0]
    }} 
    label="A" 
  />
) : null}

{journey.destinationCoords && journey.destinationCoords.coordinates ? (
  <Marker 
    position={{
      lat: journey.destinationCoords.coordinates[1],
      lng: journey.destinationCoords.coordinates[0]
    }} 
    label="Z" 
  />
) : null}


            {routePath.length > 0 && (
              <Polyline
                path={routePath}
                options={{
                  strokeColor: "#0000FF",
                  strokeOpacity: 0.8,
                  strokeWeight: 3,
                }}
              />
            )}
          </>
        )}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
};

export default JourneyMap;
