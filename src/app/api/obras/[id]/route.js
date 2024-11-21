import {NextResponse} from "next/server";
import { db } from "@/libs/firebase";
import { doc, getDoc,deleteDoc ,updateDoc } from "firebase/firestore";
import cloudinary from '@/libs/cloudinary'
import {processImage} from "@/libs/processImage";
import {unlink} from "fs/promises";



export async  function GET(request, { params }){
    try {
        const obraRef = doc(db, "obra", params.id);
        const obraSnap = await getDoc(obraRef);

        if (!obraSnap.exists()) {
            return NextResponse.json(
                { message: "Obra no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            id: obraSnap.id,
            ...obraSnap.data(),
        });
    } catch (error) {
        console.error("Error al obtener la obra:", error);
        return NextResponse.json(
            { message: "Error al obtener la obra", error: error.message },
            { status: 500 }
        );
    }
}



export async function DELETE(request, { params }){
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { message: "ID es requerido" },
                { status: 400 }
            );
        }

        const obraRef = doc(db, "obra", id);

        await deleteDoc(obraRef);

        return new Response(null, { status: 204 });
    } catch (error) {
        console.error("Error al eliminar la obra:", error);

        return NextResponse.json(
            {
                message: "Error al eliminar la obra",
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }){

    try {
        const data = await request.formData();

        const imagen = data.get("imagen");
        const nombre = data.get("nombre");
        const autor = data.get("autor");
        const categoria = data.get("categoria");
        const price = data.get("price");

        if (!nombre) {
            return NextResponse.json(
                {
                    message: "nombre es requerido",
                },
                {
                    status: 400,
                }
            );
        }

        const updatedData = {
            nombre,
            autor,
            categoria,
            price: parseFloat(price),
        };


        if (imagen) {
            const filePath = await processImage(imagen);
            const res = await cloudinary.uploader.upload(filePath);
            updatedData.imagen = res.secure_url;

            if (res) {
                await unlink(filePath);
            }
        }


        const obraRef = doc(db, "obra", params.id);


        const obraSnap = await getDoc(obraRef);
        if (!obraSnap.exists()) {
            return NextResponse.json(
                {
                    message: "obra no encontrada",
                },
                {
                    status: 404,
                }
            );
        }


        await updateDoc(obraRef, updatedData);


        const updatedObra = (await getDoc(obraRef)).data();
        return NextResponse.json({
            id: params.id,
            ...updatedObra,
        });
    } catch (error) {
        console.error("Error en PUT:", error);
        return NextResponse.json(
            {
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}