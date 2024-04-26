import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Paper,
} from "@mui/material";

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
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        User's Wallet
      </Typography>
      <Paper elevation={3} style={{ marginBottom: "20px", padding: "20px" }}>
        <List>
          {walletContent.map((item) => (
            <div key={item.id}>
              <ListItem>
                <ListItemText
                  primary={
                    pogs.find((pog) => pog.id === item.pogsId)?.pogs_name
                  }
                  secondary={
                    <>
                      <Typography variant="body2">
                        Pog ID: {item.pogsId}
                      </Typography>
                      <Typography variant="body2">
                        Quantity: {item.quantity}
                      </Typography>
                      <Typography variant="body2">
                        User Balance: {user.balance}
                      </Typography>
                    </>
                  }
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleSellPogClick(item.pogsId)}
                >
                  Sell
                </Button>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Paper>

      <Typography variant="h4" gutterBottom>
        Available Pogs
      </Typography>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <List>
          {pogs.map((pog) => (
            <div key={pog.id}>
              <ListItem disablePadding>
                <ListItemText
                  primary={pog.pogs_name}
                  secondary={`Price: ${pog.current_price}`}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleBuyPogClick(pog.id)}
                >
                  Buy
                </Button>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default BuyPogs;
