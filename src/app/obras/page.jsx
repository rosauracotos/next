"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ObraCard from "@/components/ObraCard";

function ObrasPage() {
    const [obras, setObras] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/obras`);
                setObras(data);
            } catch (error) {
                console.error("Error fetching obras:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="grid gap-4 grid-cols-4">
            {obras.map((obra) => (
                <ObraCard obra={obra} key={obra.id} />
            ))}
        </div>
    );
}

export default ObrasPage;
