import { UploadApiResponse } from "cloudinary";
export declare class FilesUploadService {
    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse>;
}
