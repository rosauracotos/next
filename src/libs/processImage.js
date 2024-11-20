import path from "path";
import { writeFile } from "fs/promises";

export async function processImage(imagen) {
    // Convertir el archivo recibido en un buffer
    const bytes = await imagen.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Cambiar la ruta a /tmp
    const filePath = path.join("/tmp", imagen.name); // /tmp es permitida en Vercel

    // Escribir el archivo en la ruta temporal
    await writeFile(filePath, buffer);

    // Devolver la ruta completa al archivo para usarla luego
    return filePath;
}
