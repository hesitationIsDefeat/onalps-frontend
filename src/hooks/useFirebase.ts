import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebaseConfig";

export default function useFirebase() {
    async function handleContentUpload(fileInput: File, contentPath: string): Promise<string> {
        try {
            if (!fileInput) {
                throw new Error("No file provided");
            }

            // Firebase storage reference
            const storageRef = ref(storage, contentPath);

            // Upload file directly (no Base64 conversion needed)
            await uploadBytes(storageRef, fileInput, { contentType: fileInput.type });

            // Get download URL
            const downloadUrl = await getDownloadURL(storageRef);
            return downloadUrl;
        } catch (error) {
            console.error("Upload failed:", error);
            return "";
        }
    }

    return { handleContentUpload };
}
