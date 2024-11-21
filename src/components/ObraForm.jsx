"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import {useRouter, useParams} from "next/navigation";


function ObraForm() {
    const [obra, setObra] = useState({
        nombre: "",
        autor: "",
        categoria: "",
        price: 0

    });

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [file, setFile] = useState(null);
    const form = useRef(null);
    const router = useRouter()
    const params = useParams()
    console.log(params)


    const handleChange = (e) => {
        setObra({
            ...obra,
            [e.target.name]: e.target.value,

    })
        };

    useEffect(() => {
        if (params.id){
            axios.get(`${API_BASE_URL}/obras/${params.id}`)
                .then(res => {
                    setObra({
                        nombre: res.data.nombre,
                        autor: res.data.autor,
                        categoria: res.data.categoria,
                        price: res.data.price
                    })
                })
        }
    }, [params?.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.set('nombre', obra.nombre)
        formData.set('autor', obra.autor)
        formData.set('categoria', obra.categoria)
        formData.set('price', obra.price)

        if (file){
            formData.append('imagen' , file)
        }

        if (!params.id){
            const res = await axios.post(`${API_BASE_URL}/obras`,formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res);
        } else {
            const res =     await axios.put(`${API_BASE_URL}/obras/${params.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log(res);
        }
        form.current.reset();
        router.refresh();
        router.push('/obras')
    };
    return(

        <div className="flex items-center justify-center min-h-screen ">
            <form className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 w-full max-w-md"
                  onSubmit={handleSubmit}
                  ref={form}
            >
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    {params.id ? "Editar Obra" : "Nueva Obra"}
                </h2>

                <label
                    htmlFor="nombre"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Nombre de la Obra:
                </label>
                <input
                    name="nombre"
                    type="text"
                    placeholder="nombre"
                    onChange={handleChange}
                    value={obra.nombre}
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    autoFocus
                />

                <label
                    htmlFor="autor"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Autor:
                </label>
                <input
                    name="autor"
                    type="text"
                    placeholder="autor"
                    onChange={handleChange}
                    value={obra.autor}
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    autoFocus
                />

                <label
                    htmlFor="categoria"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Categoría:
                </label>
                <input
                    name="categoria"
                    type="text"
                    placeholder="categoria"
                    onChange={handleChange}
                    value={obra.categoria}
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    autoFocus
                />

                <label
                    htmlFor="price"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Precio:
                </label>
                <input
                    name="price"
                    type="text"
                    placeholder="price"
                    onChange={handleChange}
                    value={obra.price}
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    autoFocus
                />

                <label
                    htmlFor="obraImagen"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Imagen de la Obra:
                </label>

                <input
                    type="file"
                    className="shadow appearance-none border rounded-lg w-full py-2 px-3 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                    }}

                />

                {
                    file && (
                        <img
                            className="w-40 h-40 object-cover mx-auto my-4 rounded-lg shadow-md"
                            src={URL.createObjectURL(file)}
                            alt=""
                        />
                    )
                }

                <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg w-full transition duration-300">
                    {params.id ?  "Actualizar Obra" : "Crear Obra"}
                </button>


            </form>


        </div>

    );
}

export default ObraForm;
