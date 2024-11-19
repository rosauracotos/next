import {NextResponse} from "next/server";
import {conn} from "@/libs/mysql";
import cloudinary from '@/libs/cloudinary'
import {processImage} from "@/libs/processImage";
import {unlink} from "fs/promises";



export async  function GET(request, { params }){
    try {
        const result = await conn.query("SELECT * FROM obra WHERE id = ?", [
            params.id,
        ]);

        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: "obra no encontrada",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(result[0]);
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 }
        );
    }
}



export async function DELETE(request, { params }){
    try {
        const result = await conn.query("DELETE FROM obra WHERE id = ?", [
            params.id,
        ]);

        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    message: "obra no encontrado",
                },
                {
                    status: 404,
                }
            );
        }

        return new Response(null, {
            status: 204,
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }){

    const data = await request.formData();
    const imagen = data.get('imagen');
    const updatedData = {

        nombre: data.get("nombre"),
        autor: data.get("autor"),
        categoria: data.get("categoria"),
        price: data.get("price"),
    }


    if (!data.get("nombre")){
        return NextResponse.json(
            {
                message: "nombre es requerido",
            },{
                status:400,
            }
        )
    }

    if (imagen){
       const filePath = await processImage(imagen);
       const res = await cloudinary.uploader.upload(filePath);
        updatedData.imagen = res.secure_url;

       if (res){
           await unlink(filePath)
       }

    }

    const result = await conn.query("update obra set ? where id = ? ", [
        updatedData,
        params.id,
    ]);

    if (result.affectedRows === 0){
        return  NextResponse.json(
            {
                message: "obra no encontrada"
            },{
                status: 404,
            }
        );
    }

    const  updatedObra = await conn.query("select * from obra where id = ? ",
        [params.id]);
    return NextResponse.json( updatedObra[0]);
}