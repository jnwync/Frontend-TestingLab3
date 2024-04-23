import React, { useState, useEffect } from "react";
import axios from "axios";

const Pog: React.FC = () => {
  const [pogs, setPogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchPogs = async () => {
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
    fetchPogs();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/pogs/api/${id}`);
      setPogs((prevPogs) => prevPogs.filter((pog) => pog.id !== id));
    } catch (error) {
      console.error("Error deleting POG:", error);
    }
  };

  const isAdmin = localStorage.getItem("userType") === "admin";

  return (
    <div className="container mx-auto">
      <h1 className="mt-8 mb-4 text-3xl font-bold">Pogs Available</h1>
      <div className="grid grid-cols-3 gap-4">
        {pogs.map((pog) => (
          <div key={pog.id} className="relative p-4 bg-gray-200 rounded-lg">
            {isAdmin && (
              <button
                className="absolute p-1 text-xs text-white bg-red-500 rounded-full top-2 right-2 hover:bg-red-600 focus:outline-none focus:bg-red-600"
                onClick={() => handleDelete(pog.id)}
              >
                Delete
              </button>
            )}
            <h2 className="text-lg font-semibold">{pog.pogs_name}</h2>
            <p className="mb-2 text-gray-600">{pog.ticker_symbol}</p>
            <p className="mb-2 text-gray-600">{pog.color}</p>
            <div className="flex items-center justify-between">
              <p className="font-bold text-gray-800">
                Price: ${pog.current_price}
              </p>
              <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pog;
