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
import { motion } from "framer-motion";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        formData
      );
      console.log(response);

      // Check for a successful response with a 200 status code
      if (response.status === 200) {
        setSuccess(true); // Set the success state to true
        // You can set user authentication state or redirect the user here
      }
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
        <Heading mb={4}>Login</Heading>
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
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Alert status="success" marginBottom={4}>
              <AlertIcon />
              Login successful!
            </Alert>
          </motion.div>
        )}
        <FormControl>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FormLabel>Email</FormLabel>
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
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <FormLabel>Password</FormLabel>
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
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button type="submit" colorScheme="teal">
            Login
          </Button>
        </motion.div>
      </form>
    </Box>
  );
}

export default Login;
