interface Props {
    score: number;
}

export default function ScoreCard({
    score,
}: Props) {
    return (
        <div className="rounded-3xl bg-slate-900 p-8 text-white">
            <p className="text-sm uppercase tracking-wider">
                Technique Score
            </p>

            <h2 className="mt-3 text-6xl font-bold">
                {score}
            </h2>

            <p className="text-slate-300">
                out of 100
            </p>
        </div>
    );
}