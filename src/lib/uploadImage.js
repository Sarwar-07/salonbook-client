/**
 * Upload an image file directly to ImgBB via the v1 upload API.
 * Uses NEXT_PUBLIC_IMGBB_API_KEY from the environment.
 *
 * @param {File} file - Browser File instance (must be an image)
 * @returns {Promise<string>} The uploaded image URL (display_url or url)
 */
export async function uploadImageToImgBB(file) {
  if (!file) {
    throw new Error('No image file selected.');
  }

  // Validate that the file is an image
  if (!file.type || !file.type.startsWith('image/')) {
    throw new Error('Please select a valid image file (e.g., JPEG, PNG, WEBP, GIF).');
  }

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error('ImgBB API key is not configured in environment variables.');
  }

  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.success) {
    const errorMsg = data?.error?.message || `Failed to upload image (Status: ${res.status}).`;
    throw new Error(errorMsg);
  }

  return data?.data?.display_url || data?.data?.url;
}
