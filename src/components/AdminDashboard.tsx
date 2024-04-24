import { useState, useEffect } from "react";
import axios from "axios";
import Pog from "./Pogs";
import PogForm, { PogFormData } from "./PogForm";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import React from "react";

function AdminDashboard(): JSX.Element {
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
      console.error("Error fetching POGS:", error);
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

  const handleRandomizePriceClick = async (): Promise<void> => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/pogs/api/update-price"
      );

      if (response.status === 200) {
        console.log("Prices randomized successfully");
        fetchPogs();
      } else {
        throw new Error("Failed to randomize prices");
      }
    } catch (error) {
      console.error("Price randomization error:", error);
    }
  };

  const handleLogout = (): void => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-end p-4">
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
          Logout
        </button>
      </div>
      <div className="container p-8 mx-auto">
        <div className="flex justify-between mb-4">
          <button
            onClick={handleAddPogClick}
            className="block px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Add Pog
          </button>
          <button
            onClick={handleRandomizePriceClick}
            className="block px-4 py-2 text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Randomize Prices
          </button>
        </div>
        {showForm && <PogForm onSubmit={handleFormSubmit} />}
        <Pog pogs={pogs} />
      </div>
    </div>
  );
}

export default AdminDashboard;
