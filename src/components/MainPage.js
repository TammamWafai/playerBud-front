import React, { useState, useEffect } from "react";
import { getAllData } from "../util/index";
import {
  Box,
  Text,
  Center,
  SimpleGrid,
  ChakraProvider,
  Button,
} from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
// import Map from "./Map";
import { Link } from "react-router-dom";

const URL = "http://localhost:8000/api/v1/";

function MainPage() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllData(URL);
        setActivities(response.activities);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

    return () => {
      console.log("unmounting");
    };
  }, []);

  const handleJoinActivity = (activityId) => {
    console.log("Joined activity with ID:", activityId);
  };

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "MMMM d, yyyy h:mm a");
  };

  return (
    <ChakraProvider>
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        <Center>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
            {activities.map((activity) => (
              <Link key={activity._id} to={`/activity/${activity._id}`}>
                <Box
                  maxW="sm"
                  borderWidth="1px"
                  rounded="lg"
                  overflow="hidden"
                >
                  <Box p="6">
                    <Box d="flex" alignItems="baseline">
                      <Text fontSize="sm" color="gray.500">
                        Sport Type: {activity.sportType}
                      </Text>
                    </Box>
                    {/* <Map location={activity.location} /> */}
                    <Text
                      mt="2"
                      fontSize="xl"
                      fontWeight="semibold"
                      lineHeight="short"
                    >
                      Description: {activity.description}
                    </Text>
                    <Text mt="2" fontSize="sm" color="gray.500">
                      Date: {formatDate(activity.date)}
                    </Text>
                    <Button
                      mt={4}
                      colorScheme="teal"
                      onClick={() => handleJoinActivity(activity._id)}
                    >
                      Join
                    </Button>
                  </Box>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Center>
      )}
    </ChakraProvider>
  );
}

export default MainPage;
