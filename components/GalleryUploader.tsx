"use client";

import { UploadCloudIcon, X } from "lucide-react";
import { useState, useRef, DragEvent } from "react";
import Image from "next/image";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useUploadThing } from "@/lib/uploadthing";

interface GalleryUploaderProps {
  endpoint: keyof OurFileRouter;
  value: { image_url: string }[];
  onChange: (images: { image_url: string }[]) => void;
  onUploadError: (error: Error) => void;
}

type UploadThingFile = {
  url?: string;
  uploadedUrl?: string;
  file?: {
    url?: string;
    ufsUrl?: string;
    ufs_url?: string;
  };
};

export default function GalleryUploader({
  endpoint,
  value,
  onChange,
  onUploadError,
}: GalleryUploaderProps) {
  const { startUpload, isUploading } = useUploadThing(endpoint);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const MAX_BYTES = 2 * 1024 * 1024;

  function extractUrl(res: UploadThingFile[] | undefined): string | null {
    if (!res?.[0]) return null;
    return (
      res[0].url ??
      res[0].uploadedUrl ??
      res[0].file?.url ??
      res[0].file?.ufsUrl ??
      res[0].file?.ufs_url ??
      null
    );
  }

  async function uploadFiles(files: FileList | File[]) {
    const validFiles = Array.from(files).filter(
      (file) => file.size <= MAX_BYTES
    );

    if (!validFiles.length) return;

    try {
      const rawRes = await startUpload(validFiles);
      const results = rawRes as UploadThingFile[];

      const newImages = results
        .map((res) => extractUrl([res]))
        .filter(Boolean)
        .map((url) => ({ image_url: url as string }));

      onChange([...value, ...newImages]);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Upload failed");
      onUploadError(error);
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    uploadFiles(e.target.files);
    e.currentTarget.value = "";
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (!e.dataTransfer.files) return;
    uploadFiles(e.dataTransfer.files);
  }

  function removeImage(index: number) {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleInput}
      />

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center h-40 w-full border-2 border-dashed rounded-lg cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <UploadCloudIcon className="w-10 h-10 text-gray-400 mb-2" />
        <p className="text-sm font-semibold">
          {isUploading
            ? "Uploading..."
            : "Drop images here or click to upload"}
        </p>
        <p className="text-xs text-gray-400">
          Multiple images allowed (Max 2MB each)
        </p>
      </div>

      {/* Preview Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {value.map((img, index) => (
            <div key={index} className="relative h-28">
              <Image
                src={img.image_url}
                alt="Gallery Image"
                fill
                className="object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}