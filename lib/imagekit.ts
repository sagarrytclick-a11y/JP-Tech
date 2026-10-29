const UPLOAD_ENDPOINT = "https://upload.imagekit.io/api/v1/files/upload";

class ImageKitNotConfiguredError extends Error {
  constructor() {
    super(
      "ImageKit is not configured. Add IMAGEKIT_PRIVATE_KEY and IMAGEKIT_URL_ENDPOINT to your environment."
    );
    this.name = "ImageKitNotConfiguredError";
  }
}

export function isImageKitConfigured() {
  return Boolean(
    process.env.IMAGEKIT_PRIVATE_KEY?.trim() &&
      process.env.IMAGEKIT_URL_ENDPOINT?.trim()
  );
}

/**
 * Uploads a file to ImageKit and returns its public URL.
 *
 * ImageKit is the only storage backend for this app, so a missing
 * configuration is treated as an error instead of silently writing to disk.
 */
export async function uploadToImageKit({
  buffer,
  fileName,
  folder = "/uploads",
  mimeType = "application/octet-stream",
}: {
  buffer: Buffer;
  fileName: string;
  folder?: string;
  mimeType?: string;
}): Promise<string> {
  if (!isImageKitConfigured()) throw new ImageKitNotConfiguredError();

  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY!.trim();
  const form = new FormData();
  form.append(
    "file",
    new Blob([new Uint8Array(buffer)], { type: mimeType }),
    fileName
  );
  form.append("fileName", fileName);
  form.append("folder", folder);
  form.append("useUniqueFileName", "true");

  const response = await fetch(UPLOAD_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${privateKey}:`).toString("base64")}`,
    },
    body: form,
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `ImageKit upload failed (${response.status})${
        detail ? `: ${detail.slice(0, 200)}` : ""
      }`
    );
  }

  const data = (await response.json()) as { url?: string };
  if (!data.url) throw new Error("ImageKit did not return a file URL.");
  return data.url;
}
