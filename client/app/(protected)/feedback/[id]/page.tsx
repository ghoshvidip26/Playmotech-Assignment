"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "../../../lib/axios";
import ScoreCard from "../../../components/ScoreCard";
import FeedbackCard from "../../../components/FeedbackCard";

interface Session {
    _id: string;
    overallScore: number;
    strengths: string[];
    areasToImprove: string[];
    priorityFix: string;
    drillSuggestion: string;
    confidenceLevel: string;
}

export default function FeedbackPage() {
    const params = useParams<{ id: string }>();
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getSession() {
            try {
                setLoading(true);
                setError("");

                const { data } = await API.get<Session[]>(
                    "/sessions"
                );
                const selectedSession = data.find(
                    (item) => item._id === params.id
                );

                if (!selectedSession) {
                    setError("Session not found.");
                    return;
                }

                setSession(selectedSession);
            } catch (error) {
                console.log("Error: ", error);
                setError("Unable to load feedback.");
            } finally {
                setLoading(false);
            }
        }

        getSession();
    }, [params.id]);

    if (loading) {
        return (
            <div className="rounded-2xl border bg-white p-5">
                Loading feedback...
            </div>
        );
    }

    if (error || !session) {
        return (
            <div className="rounded-2xl border bg-white p-5 text-red-500">
                {error || "Session not found."}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <ScoreCard
                score={session.overallScore}
            />

            <div className="grid gap-5 md:grid-cols-2">
                <FeedbackCard
                    title="Strengths"
                    items={session.strengths}
                />

                <FeedbackCard
                    title="Areas To Improve"
                    items={session.areasToImprove}
                />

                <FeedbackCard
                    title="Priority Fix"
                    text={session.priorityFix}
                />

                <FeedbackCard
                    title="Drill Suggestion"
                    text={session.drillSuggestion}
                />
            </div>

            <div className="rounded-2xl border bg-white p-5">
                <h3 className="font-semibold">
                    Confidence
                </h3>

                <p className="mt-2">
                    {session.confidenceLevel}
                </p>
            </div>
        </div>
    );
}
