import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="container mx-auto">
      <h1 className="mt-8 mb-4 text-3xl font-bold">Pogs Available</h1>
      <div className="grid grid-cols-3 gap-4">
        {localPogs.map((pog) => (
          <div key={pog.id} className="relative p-4 rounded-lg shadow-lg">
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
            {/* <p className="mb-2 text-gray-600">{pog.color}</p> */}
            <div className="flex items-center justify-between">
              <p className="font-bold text-gray-800">
                Price: ${pog.current_price.toFixed(2)}
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
