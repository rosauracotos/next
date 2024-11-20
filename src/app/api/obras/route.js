import {NextResponse} from "next/server";
import { unlink} from 'fs/promises'
import {processImage} from '@/libs/processImage'
import cloudinary from '@/libs/cloudinary'
import { db } from "@/libs/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const obra = "obra";
export async function GET(){

    try {
        const results = await getDocs(collection(db,obra));
       const obras = results.docs.map((doc) => ({
           id: doc.id,
           ...doc.data(),
       }));

        return NextResponse.json(obras);
    } catch (error){
        console.error("error en get", error)
        return NextResponse.json(
            {
                message: "error al obtener obras"
            },
            {
                status: 500,
            }
        )
    }
}

export async function POST(request){
    try {
        const data = await request.formData();
        const imagen = data.get("imagen")
        if (!data.get("nombre")){
            return NextResponse.json({
                message: "name es requerida",
            },{
                status:400
            })
        }

        if (!imagen){
            return NextResponse.json({
                message: "imagen es requerida",
            },{
                status:400
            })
        }



        const filePath = await processImage(imagen);
        const res =  await  cloudinary.uploader.upload(filePath);
        console.log(res)

        if (res){
            await unlink(filePath);
        }

        const newObra = {
            nombre: data.get("nombre"),
            autor: data.get("autor"),
            categoria: data.get("categoria"),
            price: parseFloat(data.get("price")),
            imagen: res.secure_url,
        };

        const docRef = await addDoc(collection(db, obra), newObra);
        return NextResponse.json({
            id: docRef.id,
            ...newObra,
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: error.message,
            },{
                status:500,
            }
        );
    }

}
