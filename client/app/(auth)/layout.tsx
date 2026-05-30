export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="grid min-h-screen lg:grid-cols-2">
                <div className="hidden lg:flex bg-slate-900 text-white p-12 flex-col justify-between">
                    <div>
                        <h1 className="text-5xl font-bold">
                            🏏 Ghost Coach
                        </h1>

                        <p className="mt-6 text-xl text-slate-300">
                            AI-powered cricket coaching for players looking to improve their technique.
                        </p>
                    </div>

                    <div>
                        <p className="text-slate-400">
                            Upload your batting stance and receive personalized coaching feedback powered by AI.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}