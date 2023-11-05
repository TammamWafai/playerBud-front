// api.js (or your preferred module for API functions)
const API_BASE_URL = "http://localhost:8000/api/v1"; // Replace with your actual API base URL


export async function getActivityById(activityId) {
  try {
      
     
      const jwtToken = localStorage.getItem("jwtToken"); // Get the JWT token from local storage

      const response = await fetch(`${API_BASE_URL}/activities/${activityId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          // You can add other headers as needed
          "Content-Type": "application/json", // Example content type
        },
      });
      
    if (!response.ok) {
      throw new Error("Failed to fetch activity details.");
    }
    const activityDetails = await response.json();
    return activityDetails;
  } catch (error) {
    throw error;
  }
}
