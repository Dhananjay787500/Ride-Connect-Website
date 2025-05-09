'use client';

import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 12.9716,
  lng: 77.5946,
}; // Bangalore coordinates as default

interface MapProps {
  selectedRide?: {
    pickup: { lat: number; lng: number };
    destination: { lat: number; lng: number };
  };
}

export function Map({ selectedRide }: MapProps) {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (selectedRide && map) {
      // Calculate directions
      const directionsService = new google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin: selectedRide.pickup,
          destination: selectedRide.destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          }
        }
      );
    }
  }, [selectedRide, map]);

  const onLoad = (map) => {
    setMap(map);
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
      libraries={['places']}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation || center}
        zoom={12}
        onLoad={onLoad}
      >
        {currentLocation && (
          <Marker
            position={currentLocation}
            icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
          />
        )}

        {selectedRide && (
          <>
            <Marker position={selectedRide.pickup} />
            <Marker position={selectedRide.destination} />
            {directions && <DirectionsRenderer directions={directions} />}
          </>
        )}
      </GoogleMap>
    </LoadScript>
  );
}
