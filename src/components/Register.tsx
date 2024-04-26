import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPassword = (password: string): boolean => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/.test(
      password
    );
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Invalid email");
      navigate("/error");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Invalid password");
      navigate("/error");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/user/api-register`,
        { username, email, password }
      );
      console.log(response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);

      navigate("/");
    } catch (error) {
      setError("Registration failed");
      navigate("/server-error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        px: 4,
        py: 12,
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 400, m: "auto", p: 3 }}>
        <Typography variant="h2" component="h2" align="center" mb={6}>
          Create an account
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="email"
            label="Email Address"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography variant="body1" color="error" align="center" mb={2}>
            {error}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
