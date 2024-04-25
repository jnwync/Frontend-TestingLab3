import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const BuyPogs = () => {

    const [pogs, setPogs] = useState<any[]>([]);
    const navigate = useNavigate();
    const [user, setUser] = useState<any>({});
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetchPogs();
        fetchUser();

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
    }
    const fetchUser = async (): Promise<void> => {
        try {
            console.log("userId", userId)
            const response = await axios.get("http://localhost:3000/user/api/" + userId);
            if (Array.isArray(response.data)) {
                setUser(response.data);
            } else {
                setUser({});
            }
        } catch (error) {
            navigate("/Not-found");
        }

    }

    const handleBuyPogClick = async (pogsId: number): Promise<void> => {
        console.log("Buying pog", pogsId)
        try {
            await axios.post("http://localhost:3000/user/api-buy-pogs", {
                userId: userId,
                pogsId: pogsId,
                quantity: 1
            });

            alert("Buying pog" + pogsId)


        } catch (error) {
            console.error("Failed to buy pog", error);
        }
    }

    return (
        <div>
            {pogs.map((pog) => (
                <div key={pog.id}>
                    <h2>{pog.pogs_name}</h2>
                    <p>Price: {pog.current_price}</p>
                    <button
                        onClick={ async () => await handleBuyPogClick(pog.id)}
                        className="block px-4 py-2 text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                    >
                        Buy Pogs
                    </button>
                </div>
            ))}
        </div>
    );
}

export default BuyPogs;