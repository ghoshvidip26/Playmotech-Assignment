interface Props {
    score: number;
    priorityFix: string;
    date: string;
    onClick: () => void;
}

export default function SessionCard({
    score,
    priorityFix,
    date,
    onClick
}: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full rounded-2xl border bg-white p-5 text-left transition hover:border-orange-300 hover:shadow-sm"
        >
            <div className="flex justify-between">
                <span className="text-2xl font-bold">
                    {score}/100
                </span>

                <span className="text-sm text-slate-500">
                    {date}
                </span>
            </div>

            <p className="mt-4 text-slate-700">
                {priorityFix}
            </p>
        </button>
    );
}
