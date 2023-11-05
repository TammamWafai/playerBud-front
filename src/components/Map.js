import React, { Component } from "react";

class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    if (window.google) {
      this.initializeMap();
    } else {
      this.loadGoogleMaps();
    }
  }

  loadGoogleMaps() {
    const googleMapsKey = process.env.REACT_APP_GMAPS_KEY; // Replace with your API key
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}`;
    script.defer = true;
    script.async = true;
    script.onload = this.initializeMap;
    document.head.appendChild(script);
  }

  initializeMap = () => {
    if (this.mapRef.current) {
      const map = new window.google.maps.Map(this.mapRef.current, {
        zoom: 13,
        center: { lat: 0, lng: 0 }, // Default view
      });

      let marker;

      const { street, city, state, zipCode } = this.props.location;
      const address = `${street}, ${city}, ${state}, ${zipCode}`;

      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results.length > 0) {
          const location = results[0].geometry.location;
          map.setCenter(location);

          marker = new window.google.maps.Marker({
            position: location,
            map: map,
          });

          marker.addListener("click", () => {
            this.showDirectionsToLocation(location);
          });
        }
      });
    }
  };

  showDirectionsToLocation(destination) {
    if (navigator.geolocation) {
      const geolocationOptions = {
        enableHighAccuracy: true, // Request high-precision location
        maximumAge: 0, // Force a fresh location reading
        timeout: 10000, // Timeout in milliseconds (adjust as needed)
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const origin = new window.google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          const directionsService = new window.google.maps.DirectionsService();

          const request = {
            origin,
            destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
          };

          directionsService.route(request, (response, status) => {
            if (status === "OK") {
              // Create a new tab to display the directions
              const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin.lat()},${origin.lng()}&destination=${destination.lat()},${destination.lng()}&travelmode=driving`;
              window.open(directionsUrl, "_blank");
            }
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        },
        geolocationOptions
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  render() {
    return <div ref={this.mapRef} style={{ height: "150px", width: "90%" }}></div>;
  }
}

export default Map;
