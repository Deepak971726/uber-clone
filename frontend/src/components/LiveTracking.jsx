import React, { useEffect, useState } from 'react'
import {LoadScript, GoogleMap, Marker} from '@react-google-maps/api'


const containerStyle={
    width:'100%',
    height:'100%'
  }
  const centre={
    lat:-3.745,
    lng:-38.523
  }
  

const LiveTracking = () => {
  const [currentPossition , setCurrentPosition] = useState(centre)
  useEffect(()=>{
    
    
    navigator.geolocation.getCurrentPosition((position)=>{
      const {latitude, longitude} = position.coords
      setCurrentPosition({
        lat:latitude,
        lng:longitude
      })
    })
    const watchId=  navigator.geolocation.watchPosition((position)=>{
      const {latitude, longitude} = position.coords
      setCurrentPosition({
        lat:latitude,
        lng:longitude
      })
    })
    
    return ()=> navigator.geolocation.clearWatch(watchId)
    
  },[])
  
  
  useEffect(()=>{
    
    const updatePosition = ()=>{
      navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude, longitude} = position.coords
        console.log('position updated: ', latitude, longitude)
        setCurrentPosition({
          lat:latitude,
          lng:longitude
        })
      })
    } 
    
    updatePosition()
    const intervalId = setInterval(updatePosition,1000)
    
  },[])
  
  return (
    
      <LoadScript googleMapsApiKey={import.meta.VITE_SERVER_GOOGLE_MAP_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPossition}
          zoom={15}
        
        >
          <Marker position={currentPossition}/>
          
        </GoogleMap>
      </LoadScript>
  )
}

export default LiveTracking



// import React, { useEffect, useState } from "react";
// import {
//   LoadScript,
//   GoogleMap,
//   Marker,
//   DirectionsRenderer
// } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "100vh"
// };

// const LiveTracking = (props) => {
//   const [currentPosition, setCurrentPosition] = useState(null);
//   const [directions, setDirections] = useState(null);

//   // example addresses
//   const originAddress = props?.pickup
//   const destinationAddress = props.destination;

//   // 📍 Get live position
//   useEffect(() => {
//     const watchId = navigator.geolocation.watchPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setCurrentPosition({
//           lat: latitude,
//           lng: longitude
//         });
//       },
//       (error) => console.error(error),
//       { enableHighAccuracy: true }
//     );

//     return () => navigator.geolocation.clearWatch(watchId);
//   }, []);

//   // 🛣️ Draw route and update when position changes
//   useEffect(() => {
//     if (!currentPosition) return;

//     const directionsService = new window.google.maps.DirectionsService();

//     directionsService.route(
//       {
//         origin: currentPosition, // moving point
//         destination: destinationAddress,
//         travelMode: window.google.maps.TravelMode.DRIVING
//       },
//       (result, status) => {
//         if (status === "OK") {
//           setDirections(result);
//         }
//       }
//     );
//   }, [currentPosition]);

//   return (
//     <LoadScript googleMapsApiKey={import.meta.env.VITE_SERVER_GOOGLE_MAP_API_KEY}>
//       {currentPosition && (
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={currentPosition}
//           zoom={15}
//         >
//           {/* Live marker */}
//           <Marker position={currentPosition} />

//           {/* Destination marker */}
//           <Marker position={destinationAddress} />

//           {/* Route */}
//           {directions && (
//             <DirectionsRenderer
//               directions={directions}
//               options={{
//                 suppressMarkers: true,
//                 polylineOptions: {
//                   strokeColor: "#1E90FF",
//                   strokeWeight: 5
//                 }
//               }}
//             />
//           )}
//         </GoogleMap>
//       )}
//     </LoadScript>
//   );
// };

// export default LiveTracking;
