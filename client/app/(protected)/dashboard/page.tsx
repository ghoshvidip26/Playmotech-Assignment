import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold">
                    Welcome Back 👋
                </h1>

                <p className="text-slate-500 mt-2">
                    Track your cricket technique and improve every session.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <Link
                    href="/upload"
                    className="rounded-2xl bg-white p-6 shadow-sm border"
                >
                    <h3 className="font-semibold text-lg">
                        Upload Session
                    </h3>

                    <p className="mt-2 text-slate-500">
                        Analyze a new batting stance.
                    </p>
                </Link>

                <Link
                    href="/history"
                    className="rounded-2xl bg-white p-6 shadow-sm border"
                >
                    <h3 className="font-semibold text-lg">
                        Session History
                    </h3>

                    <p className="mt-2 text-slate-500">
                        Review previous reports.
                    </p>
                </Link>

                <div className="rounded-2xl bg-white p-6 shadow-sm border">
                    <h3 className="font-semibold text-lg">
                        AI Coach
                    </h3>

                    <p className="mt-2 text-slate-500">
                        Ask follow-up questions.
                    </p>
                </div>
            </div>
        </div>
    );
}