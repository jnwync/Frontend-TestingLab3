import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Market = () => {
  const [pogs, setPogs] = useState<any[]>([]);
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({});
  const [walletContent, setWalletContent] = useState<any[]>([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchPogs();
    fetchUserData();
    fetchWalletData();
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

  const fetchWalletData = async (): Promise<void> => {
    try {
      const response = await axios.get(`http://localhost:3000/wallet/api/by-user/${userId}`);
      if (Array.isArray(response.data)) {
        setWalletContent(response.data);
      } else {
        setWalletContent([]);
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

      alert("Buying pog successful");
    } catch (error) {
      console.error("Failed to buy pog", error);
    }
  };

  const handleSellPogClick = async (pogsId: number) => {
    console.log(`userID: ${userId}, pogsId: ${pogsId},`);
    try {
      await axios.post("http://localhost:3000/user/api-sell-pogs", {
        user_id: Number(userId),
        pog_id: Number(pogsId),
        quantity: 1,
      });

      // Update wallet content after selling
      setWalletContent((prevWalletContent) =>
        prevWalletContent.map((item) => {
          if (item.pogsId === pogsId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
      );

      alert("Pog sold successfully");
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
                <button onClick={() => handleSellPogClick(item.pogsId)}>
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
          <button onClick={() => handleBuyPogClick(pog.id)}>Buy Pogs</button>
        </div>
      ))}
    </div>
  );
};

export default Market;