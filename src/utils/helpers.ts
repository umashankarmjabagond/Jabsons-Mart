import { getUploadSignature } from "@/services/product.service";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export const formatCurrency = (value?: number | string) => {
  if (value == null) return "--";
  const n = Number(value);
  if (!Number.isFinite(n)) return "--";
  return currencyFormatter.format(n);
};

export const slugify = (value?: string) => {
  if (!value) return "";

  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const uploadToCloudinary = async (file: File) => {
  // 1️⃣ get signature
  const { timestamp, signature, apiKey, cloudName, public_id } =
    await getUploadSignature();
  console.log("Upload signature response:", {
    timestamp,
    signature,
    apiKey,
    cloudName,
    public_id,
  });

  // 2️⃣ upload
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("public_id", public_id);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || "Upload failed");
  }

  return data.secure_url;
};
