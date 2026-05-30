"use client";
import { useState, useEffect } from "react";
import API from "@/app/lib/axios";
import SessionCard from "../../components/SessionCard";
import { useRouter } from "next/navigation";

interface Session {
    _id: string;
    overallScore: number;
    priorityFix: string;
    createdAt: string;
}

export default function HistoryPage() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchSessions() {
            try {
                const { data } = await API.get<Session[]>("/sessions");
                setSessions(data);
            } catch (error) {
                console.log("Error: ", error);
            }
        }

        fetchSessions();
    }, []);

    return (
        <div>
            <h1 className="text-4xl font-bold">
                Session History
            </h1>

            <div className="mt-8 grid gap-4">
                {
                    sessions.map((session) => (
                        <SessionCard
                            key={session._id}
                            score={session.overallScore}
                            priorityFix={session.priorityFix}
                            date={new Date(session.createdAt).toLocaleDateString()}
                            onClick={() => router.push(`/feedback/${session._id}`)}
                        />
                    ))
                }
            </div>
        </div>
    );
}
