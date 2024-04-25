import React from "react";
import { useState, ChangeEvent, FormEvent } from "react";
interface PogFormData {
  pogs_name: string;
  ticker_symbol: string;
  color: string;
  current_price: number;
  previous_price: number;
}


interface Props {
  onSubmit: (formData: PogFormData) => Promise<void>;
}

function PogForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<PogFormData>({
    pogs_name: "",
    ticker_symbol: "",
    color: "",
    current_price: 0,
    previous_price: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      <input
        type="text"
        name="pogs_name"
        placeholder="Pogs Name"
        value={formData.pogs_name}
        onChange={handleChange}
      />
      {errors.pogs_name && (
        <span className="text-red-500">{errors.pogs_name}</span>
      )}
      <input
        type="text"
        name="ticker_symbol"
        placeholder="Ticker Symbol"
        value={formData.ticker_symbol}
        onChange={handleChange}
      />
      {errors.ticker_symbol && (
        <span className="text-red-500">{errors.ticker_symbol}</span>
      )}
      <input
        type="text"
        name="color"
        placeholder="Color"
        value={formData.color}
        onChange={handleChange}
      />
      {errors.color && <span className="text-red-500">{errors.color}</span>}
      <input
        type="number"
        name="current_price"
        placeholder="Current Price"
        value={formData.current_price}
        onChange={handleChange}
      />
      {errors.current_price && (
        <span className="text-red-500">{errors.current_price}</span>
      )}
      <input
        type="number"
        name="previous_price"
        placeholder="Previous Price"
        value={formData.previous_price}
        onChange={handleChange}
      />
      {errors.previous_price && (
        <span className="text-red-500">{errors.previous_price}</span>
      )}
      <button type="submit">Add Pog</button>
    </form>
  );
}

export default PogForm;
