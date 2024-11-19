import {NextResponse} from "next/server";
import {conn} from "@/libs/mysql";
import { unlink} from 'fs/promises'
import {processImage} from '@/libs/processImage'
import cloudinary from '@/libs/cloudinary'
export async function GET(){

    try {
        const results = await conn.query("select * from obra");
        return NextResponse.json(results);
    } catch (error){
        return NextResponse.json(
            {
                message: error.message,
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

        const result = await  conn.query("insert into obra set ?",{
            nombre: data.get("nombre"),
            autor: data.get("autor"),
            categoria: data.get("categoria"),
            price: data.get("price"),
            imagen: res.secure_url,
        });
        return NextResponse.json({
            nombre: data.get("nombre"),
            autor: data.get("autor"),
            categoria: data.get("categoria"),
            price: data.get("price"),
            id: result.insertId,
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
