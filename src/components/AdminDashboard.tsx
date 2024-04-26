import { useState, useEffect } from "react";
import axios from "axios";
import Pog from "./Pogs";
import PogForm from "./PogForm";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Button } from "@mui/material";

interface PogFormData {
  pogs_name: string;
  ticker_symbol: string;
  color: string;
  current_price: number;
  previous_price: number;
}

// interface Props {
//   onSubmit: (formData: PogFormData) => Promise<void>;
//   onCancel?: () => void; // Making onCancel optional
// }

function AdminDashboard() {
  const [showForm, setShowForm] = useState<boolean>(false);
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
      navigate("/Not-found");
    }
  };

  const handleAddPogClick = (): void => {
    setShowForm(true);
  };

  const handleFormSubmit = async (formData: PogFormData): Promise<void> => {
    try {
      const response = await fetch("http://localhost:3000/pogs/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      setShowForm(false);
      fetchPogs();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleRandomizePriceClick = async () => {
    try {
      await axios.patch("http://localhost:3000/pogs/api/update-price");
      fetchPogs();
      alert("Prices randomized successfully");
    } catch (error) {
      alert("Failed to randomize prices");
    }
  };

  const handleLogout = (): void => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <Navbar />
      <div
        style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}
      >
        <Button
          onClick={handleLogout}
          variant="text"
          style={{ color: "#f44336", textTransform: "none" }}
        >
          Logout
        </Button>
      </div>
      <div style={{ margin: "2rem auto", padding: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <Button
            onClick={handleAddPogClick}
            variant="contained"
            color="primary"
            style={{ marginRight: "1rem" }}
          >
            Add Pog
          </Button>
          <Button
            onClick={handleRandomizePriceClick}
            variant="contained"
            color="success"
          >
            Randomize Prices
          </Button>
        </div>
        {showForm && (
          <PogForm
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        )}
        <Pog pogs={pogs} />
      </div>
    </div>
  );
}

export default AdminDashboard;
