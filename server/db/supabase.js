import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const DEFAULT_BUCKET = process.env.SUPABASE_BUCKET || "keris-uploads";

/**
 * Uploads a multer memoryStorage buffer to Supabase Storage
 */
export async function uploadToSupabase(fileBuffer, originalName, mimeType, bucket = DEFAULT_BUCKET) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase credentials not configured in server/.env");
      return null;
    }

    const safeName = originalName.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filePath = `uploads/${Date.now()}_${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, fileBuffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase Storage upload error:", uploadError);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (err) {
    console.error("Supabase Storage error:", err);
    return null;
  }
}

/**
 * Deletes a file from Supabase Storage given its public URL
 */
export async function deleteFromSupabase(fileUrl, bucket = DEFAULT_BUCKET) {
  try {
    if (!fileUrl || !fileUrl.includes(bucket)) return false;

    const parts = fileUrl.split(`${bucket}/`);
    if (parts.length < 2) return false;

    const filePath = parts[1];
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      console.error("Failed to delete image from Supabase Storage:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Supabase delete error:", err);
    return false;
  }
}
