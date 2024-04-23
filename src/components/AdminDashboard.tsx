import { useState } from "react";
import Pog from "./Pogs";
import PogForm, { PogFormData } from "./PogForm";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function AdminDashboard(): JSX.Element {
  const [showForm, setShowForm] = useState<boolean>(false);
  const navigate = useNavigate();

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
    } catch (error) {
      console.error("Form submission error:", error);
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
        <button
          onClick={handleAddPogClick}
          className="block px-4 py-2 mb-4 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Add Pog
        </button>
        {showForm && <PogForm onSubmit={handleFormSubmit} />}
        <Pog />
      </div>
    </div>
  );
}

export default AdminDashboard;
