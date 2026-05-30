interface Props {
    params: Promise<{
        sessionId: string;
    }>;
}

export default async function ChatPage({
    params,
}: Props) {
    const { sessionId } = await params;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-bold">
                    AI Coach
                </h1>

                <p className="mt-2 text-slate-500">
                    Session {sessionId}
                </p>
            </div>

            <div className="chat-log">
                <div className="chat-bubble coach">
                    <span>Coach</span>
                    <p>
                        Ask a follow-up question about this session&apos;s feedback.
                    </p>
                </div>
            </div>
        </div>
    );
}
