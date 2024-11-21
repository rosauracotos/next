import path from "path";
import { writeFile } from "fs/promises";

export async function processImage(imagen) {

    const bytes = await imagen.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join("/tmp", imagen.name); // /tmp es permitida en Vercel
    await writeFile(filePath, buffer);
    return filePath;
}
