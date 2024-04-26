import React, { useState, useEffect } from "react";
import axios from "axios";
import Pog from "./Pogs";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function UserDashboard(): JSX.Element {
  const [pogs, setPogs] = useState<any[]>([]);
  const [walletContent, setWalletContent] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPogs();
  }, []);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3000/wallet/api/user/${userId}`)
        .then((response) => {
          setWalletContent(response.data);
        })
        .catch((error) => {
          console.error("Error fetching wallet content:", error);
        });
    }
  }, [userId]);

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
      <div>
        <h2>User's Wallet</h2>
        {walletContent.length === 0 ? (
          <p>No items found in the user's wallet.</p>
        ) : (
          <ul>
            {walletContent.map((item) => (
              <li key={item.id}>
                <p>Pog ID: {item.pogsId}</p>
                <p>Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-end p-4">
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
          Logout
        </button>

        <button
          onClick={handleNavigate}
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
          hello
        </button>
      </div>
      <div className="container p-8 mx-auto">
        <Pog pogs={pogs} />
      </div>
    </div>
  );
}

export default UserDashboard;
