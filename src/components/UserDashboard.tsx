import { useState, useEffect } from "react";
import Pog from "./Pogs";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

function UserDashboard(): JSX.Element {
  const [pogs, setPogs] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserPogs();
  }, []);

  const fetchUserPogs = async (): Promise<void> => {
    try {
      const response = await axios.get("http://localhost:3000/user/pogs");

      if (Array.isArray(response.data)) {
        setPogs(response.data);
      } else {
        setPogs([]);
      }
    } catch (error) {
      console.error("Error fetching user-specific Pogs:", error);
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
        <Pog pogs={pogs} />
      </div>
    </div>
  );
}

export default UserDashboard;
