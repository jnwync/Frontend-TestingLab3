import React, { useState, useEffect } from "react";
import axios from "axios";
import Pog from "./Pogs";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";

function UserDashboard(): JSX.Element {
  const [pogs, setPogs] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPogs();
  }, []);

  const fetchPogs = async (): Promise<void> => {
    try {
      const response = await axios.get("http://localhost:3000/pogs/api");
      if (Array.isArray(response.data)) {
        setPogs(response.data);
      } else {
        setPogs([]);
      }
    } catch (error) {
      console.error("Error fetching POGS:", error);
    }
  };

  const handleNavigate = () => {
    navigate("/buy-pogs");
  };

  const handleLogout = (): void => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="flex-end" py={2}>
          <Button
            onClick={handleLogout}
            variant="text"
            style={{ color: "#f44336", textTransform: "none" }}
          >
            Logout
          </Button>
          <Button variant="text" color="primary" onClick={handleNavigate}>
            Buy Pogs
          </Button>
        </Box>
        <Box px={4}>
          <Pog pogs={pogs} />
        </Box>
      </Container>
    </div>
  );
}

export default UserDashboard;
