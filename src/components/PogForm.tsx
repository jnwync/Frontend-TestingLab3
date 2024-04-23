import { useState, ChangeEvent, FormEvent } from "react";

interface PogFormData {
  pogs_name: string;
  ticker_symbol: string;
  color: string;
  current_price: number;
  previous_price: number;
}

interface Props {
  onSubmit: (formData: PogFormData) => Promise<void>; // Updated to accept Promise<void>
}

function PogForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<PogFormData>({
    pogs_name: "",
    ticker_symbol: "",
    color: "",
    current_price: 0,
    previous_price: 0,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(formData); // Ensure to await the promise
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
      <input
        type="text"
        name="ticker_symbol"
        placeholder="Ticker Symbol"
        value={formData.ticker_symbol}
        onChange={handleChange}
      />
      <input
        type="text"
        name="color"
        placeholder="Color"
        value={formData.color}
        onChange={handleChange}
      />
      <input
        type="number"
        name="current_price"
        placeholder="Current Price"
        value={formData.current_price}
        onChange={handleChange}
      />
      <input
        type="number"
        name="previous_price"
        placeholder="Previous Price"
        value={formData.previous_price}
        onChange={handleChange}
      />
      <button type="submit">Add Pog</button>
    </form>
  );
}

export default PogForm;
