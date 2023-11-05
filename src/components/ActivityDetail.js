import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivityById } from "../api/getActivityById"; // Replace with your API function
import Map from "./Map"

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    // Define an asynchronous function to fetch activity details
    async function fetchActivityDetails() {
      try {
        const response = await getActivityById(id);
        setActivity(response.activity); // Update the state with the fetched activity
      } catch (error) {
        console.error("Error fetching activity details:", error);
      }
    }

    // Call the function to fetch activity details when the component mounts
    fetchActivityDetails();
  }, [id]);

  if (!activity) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{activity.sportType}</h2>
      <p>Description: {activity.description}</p>
      
      {/* Render more details here */}
      <p>Date: {activity.date}</p>
      <p>Time: {activity.time}</p>
      <Map location={activity.location} />
      <p>Place Number: {activity.location.placeNum}</p>
      <p>Street: {activity.location.street}</p>
      <p>City: {activity.location.city}</p>
      <p>State: {activity.location.state}</p>
      <p>Zip Code: {activity.location.zipCode}</p>
      <p>Indoor/Outdoor: {activity.indoorOutdoor}</p>
      <p>Max Players: {activity.maxPlayers}</p>
      <p>Min Players: {activity.minPlayers}</p>
      <p>Weather: {activity.weather}</p>
      <p>Temperature (F): {activity.tempF}</p>
      <p>Contact Name: {activity.contactName}</p>
      <p>Contact Number: {activity.contactNum}</p>
      <p>Fees: {activity.fees}</p>
      <p>Notes: {activity.notes}</p>
    </div>
  );
};

export default ActivityDetail;
