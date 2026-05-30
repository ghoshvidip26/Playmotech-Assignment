"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import API from "../../lib/axios";

export default function RegisterPage() {
    const router = useRouter();

    const [loading, setLoading] =
        useState(false);

    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
        sport: "Cricket",
        role: "Batter",
        level: "Beginner",
    });

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (
        e: FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data } =
                await API.post(
                    "/auth/register",
                    user
                );
            localStorage.setItem(
                "token",
                data.accessToken
            );

            router.push("/dashboard");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="rounded-3xl bg-white border p-8 shadow-sm">
                <h2 className="text-3xl font-bold">
                    Create Account
                </h2>

                <p className="mt-2 text-slate-500">
                    Start receiving personalized cricket coaching.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-4"
                >
                    <input
                        name="fullName"
                        placeholder="Full Name"
                        value={user.fullName}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3"
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3"
                    />

                    <input
                        name="role"
                        placeholder="Batter"
                        value={user.role}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3"
                    />

                    <select
                        name="level"
                        value={user.level}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3"
                    >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-orange-500 py-3 text-white"
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                    Already have an account?
                    <a
                        href="/login"
                        className="ml-1 text-orange-500"
                    >
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    );
}