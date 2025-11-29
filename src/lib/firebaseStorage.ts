import { storage } from './firebaseClient';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from 'firebase/storage';

/**
 * Upload a single image to Firebase Storage
 * @param file - The file to upload
 * @param path - The storage path (e.g., 'products/product-id/image.jpg')
 * @param onProgress - Optional callback for upload progress
 * @returns The download URL of the uploaded image
 */
export async function uploadImage(
  file: File,
  path: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  const storageRef = ref(storage, path);

  if (onProgress) {
    // Use resumable upload for progress tracking
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  } else {
    // Simple upload without progress tracking
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }
}

/**
 * Upload multiple images to Firebase Storage
 * @param files - Array of files to upload
 * @param basePath - Base storage path (e.g., 'products/product-id')
 * @param onProgress - Optional callback for overall progress
 * @returns Array of download URLs
 */
export async function uploadMultipleImages(
  files: File[],
  basePath: string,
  onProgress?: (progress: number) => void
): Promise<string[]> {
  const uploadPromises = files.map(async (file, index) => {
    const fileName = `${Date.now()}-${index}-${file.name}`;
    const path = `${basePath}/${fileName}`;
    return uploadImage(file, path);
  });

  const urls: string[] = [];
  let completed = 0;

  for (const promise of uploadPromises) {
    const url = await promise;
    urls.push(url);
    completed++;
    if (onProgress) {
      onProgress((completed / files.length) * 100);
    }
  }

  return urls;
}

/**
 * Delete an image from Firebase Storage
 * @param url - The download URL or storage path of the image
 */
export async function deleteImage(url: string): Promise<void> {
  try {
    // If it's a full URL, extract the path
    if (url.startsWith('http')) {
      const urlObj = new URL(url);
      const pathMatch = urlObj.pathname.match(/\/o\/(.+)\?/);
      if (pathMatch) {
        const path = decodeURIComponent(pathMatch[1]);
        const storageRef = ref(storage, path);
        await deleteObject(storageRef);
        return;
      }
    }
    
    // Otherwise treat it as a direct path
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

/**
 * Delete all images in a folder
 * @param folderPath - The folder path (e.g., 'products/product-id')
 */
export async function deleteFolder(folderPath: string): Promise<void> {
  const folderRef = ref(storage, folderPath);
  const listResult = await listAll(folderRef);

  const deletePromises = listResult.items.map((itemRef) => deleteObject(itemRef));
  await Promise.all(deletePromises);

  // Recursively delete subfolders
  const subfolderPromises = listResult.prefixes.map((prefixRef) =>
    deleteFolder(prefixRef.fullPath)
  );
  await Promise.all(subfolderPromises);
}

/**
 * Get all image URLs from a folder
 * @param folderPath - The folder path (e.g., 'products/product-id')
 * @returns Array of download URLs
 */
export async function getImagesFromFolder(folderPath: string): Promise<string[]> {
  const folderRef = ref(storage, folderPath);
  const listResult = await listAll(folderRef);

  const urlPromises = listResult.items.map((itemRef) => getDownloadURL(itemRef));
  return await Promise.all(urlPromises);
}

