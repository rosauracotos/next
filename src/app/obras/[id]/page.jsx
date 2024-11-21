
import axios from "axios";
import Buttons from "@/app/obras/[id]/Buttons";

async function loadObra(obraId){
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/obras/${obraId}`);
    return data;
}


async function ObraPage({params}){
    const obra = await loadObra(params.id);
    console.log(obra);

    return (
        <section className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex flex-col md:flex-row w-5/6 max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Contenedor de texto */}
                <div className="p-8 w-full md:w-2/3">
                    <h3 className="text-3xl font-extrabold text-purple-700 mb-4">📚 {obra.nombre}</h3>
                    <h4 className="text-2xl font-semibold text-gray-800 mb-4">
                        ✍️ Autor: <span className="italic">{obra.autor}</span>
                    </h4>
                    <p className="text-lg text-gray-600 mb-2">
                        📖 Categoría: <span className="font-medium text-blue-500">{obra.categoria}</span>
                    </p>
                    <p className="text-lg text-gray-600 mb-4">
                        💰 Precio: <span className="text-green-600 font-bold">S/ {obra.price}</span>
                    </p>
                    <Buttons obraId={obra.id}/>
                </div>
                {/* Imagen */}
                <div className="w-full md:w-1/3">
                    <img
                        src={obra.imagen}
                        alt={`Portada de ${obra.nombre}`}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </section>


    )
}

export default ObraPage;