"use client";

import { useRef, useState } from "react";
import API from "../lib/axios";
import { useRouter } from "next/navigation";

export default function UploadBox() {
    const fileRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selected = event.target.files?.[0];

        if (!selected) return;

        setFile(selected);

        const imageUrl = URL.createObjectURL(selected);
        setPreview(imageUrl);
    };

    const handleSubmit = async () => {
        if (!file) return;

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("image", file);

            const { data } = await API.post(
                "/sessions/create-session",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            router.push(`/feedback/${data._id}`);
        } catch (error: unknown) {
            const responseError = error as {
                response?: {
                    status?: number;
                    data?: unknown;
                    headers?: unknown;
                };
            };

            console.log(error);
            console.log("ERROR", responseError.response?.status);
            console.log("DATA", responseError.response?.data);
            console.log("HEADERS", responseError.response?.headers);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <button
                onClick={() => fileRef.current?.click()}
                className="flex h-80 w-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-300"
            >
                {preview ? (
                    <img
                        src={preview}
                        alt="preview"
                        className="h-full w-full rounded-2xl object-cover"
                    />
                ) : (
                    <span className="text-slate-500">
                        Upload batting stance image
                    </span>
                )}
            </button>

            <input
                hidden
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />

            <button
                onClick={handleSubmit}
                disabled={!file || loading}
                className="mt-5 w-full rounded-xl bg-orange-500 px-4 py-3 text-white"
            >
                {loading
                    ? "Analyzing..."
                    : "Analyze Technique"}
            </button>
        </div>
    );
}
