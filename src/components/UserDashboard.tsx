import { useState } from "react";
import Pog from "./Pogs";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function AdminDashboard(): JSX.Element {
  const navigate = useNavigate();

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
        <Pog />
      </div>
    </div>
  );
}

export default AdminDashboard;
