"use client";

import React from "react";
import { useGetUserProgressQuery } from "../../../../graphql/generated";
import UserProgressChart from "./_components/chart";
import { useParams } from "next/navigation";

export default function ChartPage() {
  const { id } = useParams();
  const userId = Array.isArray(id) ? id[0] : id;

  if (!userId) {
    return <div>User ID is missing</div>;
  }

  const { data, loading, error } = useGetUserProgressQuery({
    variables: { userId },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const progressData =
    data?.getUserProgress?.map((item) => ({
      questionId: item.questionId,
      isCorrect: item.isCorrect,
      timeDuration: item.timeDuration || 0,
      answer: item.answer,
      userId: userId!,
    })) || [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <UserProgressChart progressData={progressData} />
    </div>
  );
}
