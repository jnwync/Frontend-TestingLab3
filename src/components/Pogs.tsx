import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";

interface PogProps {
  pogs: any[];
  updatePogs?: () => void;
}

const Pog: React.FC<PogProps> = ({ pogs, updatePogs }) => {
  const [localPogs, setLocalPogs] = useState<any[]>(pogs);

  useEffect(() => {
    setLocalPogs(pogs);
  }, [pogs]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/pogs/api/${id}`);
      const updatedPogs = localPogs.filter((pog) => pog.id !== id);
      setLocalPogs(updatedPogs);
      if (updatePogs) {
        updatePogs();
      }
    } catch (error) {
      console.error("Error deleting POG:", error);
    }
  };

  const isAdmin = localStorage.getItem("userType") === "admin";

  return (
    <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Pogs Available
      </Typography>
      <Grid container spacing={4}>
        {localPogs.map((pog) => (
          <Grid item key={pog.id} xs={12} sm={6} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: "1.5rem",
                borderRadius: "1rem",
                position: "relative",
              }}
            >
              {isAdmin && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
                  onClick={() => handleDelete(pog.id)}
                >
                  Delete
                </Button>
              )}
              <Typography variant="h6" gutterBottom>
                {pog.pogs_name}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Ticker Symbol: {pog.ticker_symbol}
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  Price: ${pog.current_price.toFixed(2)}
                </Typography>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Pog;
