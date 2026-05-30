interface Props {
    title: string;
    items?: string[];
    text?: string;
}

export default function FeedbackCard({
    title,
    items,
    text,
}: Props) {
    return (
        <div className="rounded-2xl border bg-white p-5">
            <h3 className="font-semibold text-lg">
                {title}
            </h3>

            {items ? (
                <ul className="mt-4 space-y-2">
                    {items.map((item) => (
                        <li key={item}>
                            • {item}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-4 text-slate-600">
                    {text}
                </p>
            )}
        </div>
    );
}