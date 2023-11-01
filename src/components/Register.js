import { useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { motion } from "framer-motion"; // For animations

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/register",
        formData
      );
      console.log(response);

      // Handle a successful Register
      setSuccessMessage("Register successful");
      // You can also redirect the user or perform any other actions here
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with an error
        setError(error.response.data.message); // Customize the error message based on your API response structure
      } else if (error.request) {
        // The request was made but no response was received
        setError("Network error. Please try again later.");
      } else {
        // Something else happened while setting up the request
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading mb={4}>Register</Heading>
      </motion.div>
      <form onSubmit={handleSubmit}>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Alert status="error" marginBottom={4}>
              <AlertIcon />
              {error}
            </Alert>
          </motion.div>
        )}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Alert status="success" marginBottom={4}>
              <AlertIcon />
              {successMessage}
            </Alert>
          </motion.div>
        )}
        <FormControl>
          <FormLabel>Name</FormLabel>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Input
              type="text"
              placeholder="Enter your name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </motion.div>
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </motion.div>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Input
              type="password"
              autoComplete="username"
              placeholder="Enter your password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </motion.div>
        </FormControl>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button type="submit" colorScheme="teal">
            Register
          </Button>
        </motion.div>
      </form>
    </Box>
  );
}

export default Register;
