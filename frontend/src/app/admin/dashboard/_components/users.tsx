"use client";

import CorrectIncorrectPieChart from "@/app/graph/[id]/_components/correct-incorrect";
import {
  useGenerateUserAnalysisMutation,
  useGetUsersQuery,
} from "../../../../../graphql/generated";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type SkillAssessment = {
  skill: string;
  subSkill?: string | null;
  score: number;
  level: string;
  feedback?: string | null;
};

type Analysis = {
  overallScore: number;
  skillAssessments: SkillAssessment[];
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  analysisDate: string;
  confidence: number;
};

export const UsersInfo = () => {
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useGetUsersQuery();
  const router = useRouter();
  const { id } = useParams();
  const initialSelectedId = Array.isArray(id) ? id[0] : id || null;
  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    initialSelectedId
  );

  const [analysisMap, setAnalysisMap] = useState<
    Record<string, SkillAssessment[]>
  >({});

  const [
    generateUserAnalysis,
    { data: analysisData, loading: analysisLoading, error: analysisError },
  ] = useGenerateUserAnalysisMutation();

  useEffect(() => {
    if (selectedUserId && !analysisMap[selectedUserId]) {
      generateUserAnalysis({ variables: { userId: selectedUserId } });
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (
      analysisData?.generateUserAnalysis?.analysis?.skillAssessments &&
      selectedUserId
    ) {
      setAnalysisMap((prev) => ({
        ...prev,
        [selectedUserId]:
          analysisData?.generateUserAnalysis?.analysis?.skillAssessments || [],
      }));
    }
  }, [analysisData, selectedUserId]);

  useEffect(() => {
    if (!selectedUserId && usersData?.getUsers.length) {
      setSelectedUserId(usersData.getUsers[0].id);
    }
  }, [usersData, selectedUserId]);

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    router.push(`/graph/${userId}`);
  };

  if (usersLoading || analysisLoading)
    return <p>Loading users and progress...</p>;
  if (usersError) return <p>Error loading users: {usersError.message}</p>;
  if (analysisError)
    return <p>Error loading analysis: {analysisError.message}</p>;

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Сурагчдын нэрс </h2>
      <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border px-4 py-2">№</th>
              <th className="border px-4 py-2">Анги</th>
              <th className="border px-4 py-2">Овог Нэр</th>
              <th className="border px-4 py-2">Нийт асуулт</th>
              <th className="border px-4 py-2">Зөв хариулт</th>
              <th className="border px-4 py-2">Хувь</th>
              <th className="border px-4 py-2">Харагдац</th>
            </tr>
          </thead>
          <tbody>
            {usersData?.getUsers.map((user, index) => {
              const userProgress = analysisMap[user.id] || [];
              const total = userProgress.length;
              const correct = userProgress.filter((p) => p.score > 0).length;
              const percentage =
                total === 0 ? 0 : Math.round((correct / total) * 100);
              const isSelected = user.id === selectedUserId;

              return (
                <tr
                  key={user.id}
                  onClick={() => handleUserClick(user.id)}
                  className={`cursor-pointer transition ${
                    isSelected ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">{"2I"}</td>
                  <td className="border px-4 py-2 font-medium text-gray-800">
                    {user.name}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {total > 0 ? total : "—"}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {total > 0 ? total : "—"}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {total > 0 ? `${percentage}%` : "—"}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {total > 0 ? (
                      <div className="w-12 h-12 mx-auto">
                        <CorrectIncorrectPieChart
                          correct={correct}
                          incorrect={total - correct}
                        />
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">
                        Оноо байхгүй
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
