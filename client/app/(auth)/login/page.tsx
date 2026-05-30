"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../lib/axios";

export default function LoginPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
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

            const { data } = await API.post(
                "/auth/login",
                user
            );

            console.log("LOGIN RESPONSE", data);

            localStorage.setItem(
                "token",
                data.token
            );

            router.push("/dashboard");
        } catch (error: unknown) {
            const responseError = error as {
                response?: {
                    data?: unknown;
                };
            };

            console.log(
                responseError.response?.data ?? error
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="rounded-3xl bg-white border p-8 shadow-sm">
                <h2 className="text-3xl font-bold">
                    Welcome Back 👋
                </h2>

                <p className="mt-2 text-slate-500">
                    Sign in to continue your coaching journey.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label className="text-sm font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="player@example.com"
                            className="mt-2 w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="mt-2 w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-orange-500 py-3 text-white font-medium"
                    >
                        {loading
                            ? "Signing In..."
                            : "Sign In"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                    Don&apos;t have an account?
                    <a
                        href="/register"
                        className="ml-1 text-orange-500"
                    >
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}
