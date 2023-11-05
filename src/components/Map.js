
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
    const googleMapsKey = "AIzaSyBBtBpFcJzTP6jzChDcHOe0S-T7yoQcxxI"; // Replace with your API key
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
    const directionsService = new window.google.maps.DirectionsService();
    const directionsDisplay = new window.google.maps.DirectionsRenderer();

    const origin = new window.google.maps.LatLng(0, 0);

    const request = {
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (response, status) => {
      if (status === "OK") {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap(this.mapRef.current);
      }
    });
  }

  render() {
    return <div ref={this.mapRef} style={{ height: "150px", width: "100%" }}></div>;
  }
}

export default Map;
