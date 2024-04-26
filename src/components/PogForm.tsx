import React from "react";
import { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Button } from "@mui/material";

interface PogFormData {
  pogs_name: string;
  ticker_symbol: string;
  color: string;
  current_price: number;
  previous_price: number;
}

interface Props {
  onSubmit: (formData: PogFormData) => Promise<void>;
  onCancel: () => void;
}

function PogForm({ onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState<PogFormData>({
    pogs_name: "",
    ticker_symbol: "",
    color: "",
    current_price: 0,
    previous_price: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error message when the input changes
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit(formData);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    if (!formData.pogs_name.trim()) {
      newErrors.pogs_name = "Pogs Name is required";
      isValid = false;
    }

    if (!formData.ticker_symbol.trim()) {
      newErrors.ticker_symbol = "Ticker Symbol is required";
      isValid = false;
    }

    if (!formData.color.trim()) {
      newErrors.color = "Color is required";
      isValid = false;
    }

    if (isNaN(formData.current_price) || formData.current_price <= 0) {
      newErrors.current_price = "Current Price must be a valid positive number";
      isValid = false;
    }

    if (isNaN(formData.previous_price) || formData.previous_price <= 0) {
      newErrors.previous_price =
        "Previous Price must be a valid positive number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Pogs Name"
        name="pogs_name"
        value={formData.pogs_name}
        onChange={handleChange}
        error={!!errors.pogs_name}
        helperText={errors.pogs_name}
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Ticker Symbol"
        name="ticker_symbol"
        value={formData.ticker_symbol}
        onChange={handleChange}
        error={!!errors.ticker_symbol}
        helperText={errors.ticker_symbol}
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Color"
        name="color"
        value={formData.color}
        onChange={handleChange}
        error={!!errors.color}
        helperText={errors.color}
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Current Price"
        name="current_price"
        type="number"
        value={formData.current_price}
        onChange={handleChange}
        error={!!errors.current_price}
        helperText={errors.current_price}
        margin="normal"
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Previous Price"
        name="previous_price"
        type="number"
        value={formData.previous_price}
        onChange={handleChange}
        error={!!errors.previous_price}
        helperText={errors.previous_price}
        margin="normal"
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary">
        Add Pog
      </Button>
      <Button variant="contained" onClick={onCancel}>
        Cancel
      </Button>
    </form>
  );
}

export default PogForm;
