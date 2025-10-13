import imageCompression from "browser-image-compression";

export async function imageCompress(file: File, maxSize: number = 1) {

  const options = {
    maxSizeMB: maxSize,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    maxIteration: 5
  };

  try {
    const compressedBlob = await imageCompression(file, options);

    const compressedFile = new File([compressedBlob], file.name, {
      type: file.type,
      lastModified: Date.now(),
    });

    console.log(`compress size ${compressedBlob.size / 1024 / 1024} MB`);

    return compressedFile;

  } catch (error) {
    console.log(error);
    throw error;
  }
}
