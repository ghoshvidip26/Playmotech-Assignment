"use client";

import UploadBox from "../../components/UploadBox";

export default function UploadPage() {
    return (
        <div className="max-w-4xl">
            <h1 className="text-4xl font-bold">
                Upload Batting Stance
            </h1>

            <p className="mt-2 text-slate-500">
                Upload a clear image and receive AI-powered feedback.
            </p>

            <div className="mt-8">
                <UploadBox />
            </div>
        </div>
    );
}