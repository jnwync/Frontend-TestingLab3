import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const BuyPogs = () => {
  const [pogs, setPogs] = useState<any[]>([]);
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({});
  const [walletContent, setWalletContent] = useState<any[]>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchPogs();
    fetchUserData();
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

  const fetchUserData = async (): Promise<void> => {
    try {
      const response = await axios.get(
        `http://localhost:3000/user/api/${userId}`
      );
      setUser(response.data);
    } catch (error) {
      navigate("/Not-found");
    }
  };

  const handleBuyPogClick = async (pogsId: number): Promise<void> => {
    console.log("Buying pog", pogsId);
    try {
      await axios.post("http://localhost:3000/user/api-buy-pogs", {
        userId: userId,
        pogsId: pogsId,
        quantity: 1,
      });

      alert("Buying pog" + pogsId);
    } catch (error) {
      console.error("Failed to buy pog", error);
    }
  };

  const handleSellPogClick = async (pogsId: number): Promise<void> => {
    console.log("Selling pog", pogsId);
    try {
      await axios.post("http://localhost:3000/user/api-sell-pogs", {
        userId: userId,
        pogsId: pogsId,
        quantity: 1,
      });

      alert("Selling pog" + pogsId);
    } catch (error) {
      console.error("Failed to sell pog", error);
    }
  };

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

  return (
    <div>
      <div>
        <h2>User's Wallet</h2>
        {walletContent.length === 0 ? (
          <p>No items found in the user's wallet.</p>
        ) : (
          <ul>
            {walletContent.map((item) => (
              <li key={item.id}>
                <p>
                  Pog Name:{" "}
                  {pogs.find((pog) => pog.id === item.pogsId)?.pogs_name}
                </p>
                <p>Pog ID: {item.pogsId}</p>
                <p>Quantity: {item.quantity}</p>
                <p>User Balance: {user.balance}</p>
                <button
                  onClick={async () => await handleSellPogClick(item.pogsId)}
                  className="block px-4 py-2 mt-2 text-white bg-red-500 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                  Sell Pog
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {pogs.map((pog) => (
        <div key={pog.id}>
          <h2>{pog.pogs_name}</h2>
          <p>Price: {pog.current_price}</p>
          <button
            onClick={async () => await handleBuyPogClick(pog.id)}
            className="block px-4 py-2 text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Buy Pogs
          </button>
        </div>
      ))}
    </div>
  );
};

export default BuyPogs;
