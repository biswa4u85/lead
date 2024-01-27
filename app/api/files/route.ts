import { successResponse, errorResponse } from "@/libs/utility";
import { NextRequest } from "next/server";
import cloudinary from "cloudinary"

cloudinary.v2.config({
    cloud_name: process.env.STORAGE_NAME,
    api_key: process.env.STORAGE_API_KEY,
    api_secret: process.env.STORAGE_API_SECRET,
})

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    const file: any = formData.get("file") as Blob | null;
    if (!file) return errorResponse("File blob is required.", 400);

    const buffer = Buffer.from(await file.arrayBuffer());

    try {
        const result = await uploadToCloudinary(buffer);
        return successResponse(result);
    } catch (error) {
        return errorResponse("Error uploading file to Cloudinary", 500);
    }
}

async function uploadToCloudinary(buffer: any) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
        uploadStream.end(buffer);
    });
}