"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Buttons({ obraId }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false); // Estado para el indicador de carga

    const handleDelete = async () => {
        if (confirm("¿Estás seguro de que deseas eliminar esta obra?")) {
            setLoading(true); // Activa el estado de carga
            try {
                const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/obras/${obraId}`);
                if (res.status === 204) {
                    router.push("/obras");
                    router.refresh();
                }
            } catch (error) {
                console.error("Error al eliminar la obra:", error);
            } finally {
                setLoading(false); // Desactiva el estado de carga
            }
        }
    };

    return (
        <div className="flex gap-x-4 justify-start mt-4">
            <button
                className="flex items-center justify-center gap-x-2 bg-red-500 text-white font-bold py-2 px-4 rounded-md "
                onClick={handleDelete}
                disabled={loading}
            >
                ELIMINAR
            </button>
            <button
                className="flex items-center justify-center gap-x-2 bg-gray-500 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-600"
                onClick={() => {
                    router.push(`/obras/edit/${obraId}`);
                }}
            >
                ✏️ Editar
            </button>
        </div>
    );
}

export default Buttons;
