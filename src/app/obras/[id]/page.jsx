
import axios from "axios";
import Buttons from "@/app/obras/[id]/Buttons";

async function loadObra(obraId){
    const {data} = await axios.get("http://localhost:3000/api/obras/" + obraId);
    return data;
}


async function ObraPage({params}){
    const obra = await loadObra(params.id);
    console.log(obra);

    return(
        <section className="flex justify-center items-center h-[calc(100vh-10rem)]">
            <div className="flex w-4/6 h-2/6 justify-center">
                <div className="p-6 bg-white w-1/3">
                    <h3 className="text-2xl font-bold mb-3">Nombre : {obra.nombre}</h3>
                    <h3 className="text-4xl font-bold ">Autor : {obra.autor}</h3>
                    <p>Categoria : {obra.categoria}</p>
                    <p>Precio : {obra.price}</p>
                    <Buttons obraId={obra.id}/>
                </div>
                <img src={obra.imagen} className="w-1/3" alt="" />

            </div>
        </section>

    )
}

export default ObraPage;