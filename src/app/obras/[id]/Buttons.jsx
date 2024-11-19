"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
function Buttons({obraId}) {

    const router = useRouter();
    return (
        <div className="flex gap-x-2 justify-end mt-2">
            <button className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
                    onClick={async () => {
                        if (confirm("are you sure you want to delete this obra?")) {
                            const res = await axios.delete("/api/obras/" + obraId);
                            if (res.status === 204) {
                                router.push("/obras");
                                router.refresh();
                            }
                        }
                    }}
            >delete</button>
            <button className="bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded"
            onClick={() => {
                router.push(`/obras/edit/${obraId}`);
            }}
            >edit</button>
        </div>
    )
}

export default Buttons;