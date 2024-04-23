// In AdminDashboard.tsx
import { useState } from "react";
import Navbar from "./Navbar";
import Pog from "./Pogs";
import PogForm from "./PogForm";

interface PogFormData {
  pogs_name: string;
  ticker_symbol: string;
  color: string;
  current_price: number;
  previous_price: number;
}

function AdminDashboard(): JSX.Element {
  const [showForm, setShowForm] = useState<boolean>(false);

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

  return (
    <div>
      <Navbar />
      <button onClick={handleAddPogClick}>Add Pog</button>
      {showForm && <PogForm onSubmit={handleFormSubmit} />}
      <Pog />
    </div>
  );
}

export default AdminDashboard;
