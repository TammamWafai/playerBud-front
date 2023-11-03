import React, { useEffect, useRef } from "react";

const Map = ({ location }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 13,
        center: { lat: 0, lng: 0 }, // Default view
      });

      // Construct the address from the location fields
      const { street, city, state, zipCode } = location;
      const address = `${street}, ${city}, ${state}, ${zipCode}`;

      // Use the Google Maps Geocoding service to convert the address to coordinates
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results.length > 0) {
          const location = results[0].geometry.location;
          map.setCenter(location);
          new window.google.maps.Marker({
            position: location,
            map: map,
          });
        }
      });
    }
  }, [location]);

  return <div ref={mapRef} style={{ height: "150px", width: "100%" }}></div>;
};

export default Map;
