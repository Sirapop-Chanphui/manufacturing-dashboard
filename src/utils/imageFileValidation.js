/** Same rules as admin post image upload (AdminEditArticle / AdminCreateArticle). */
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

export const IMAGE_FILE_ACCEPT = "image/jpeg,image/png,image/gif,image/webp";

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

/**
 * @param {File} file
 * @returns {{ ok: true } | { ok: false, message: string }}
 */
export function validateImageFile(file) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      ok: false,
      message: "Please upload a valid image (JPEG, PNG, GIF, WebP).",
    };
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return { ok: false, message: "Image must be smaller than 5MB." };
  }
  return { ok: true };
}
