"use client";

import CorrectIncorrectPieChart from "@/app/graph/[id]/_components/correct-incorrect";
import { useGetUserProgressQuery } from "../../../../../graphql/generated";

import { useGetUsersQuery } from "../../../../../graphql/generated";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const UsersInfo = () => {
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useGetUsersQuery();

  const router = useRouter();
  const { id } = useParams();
  const [selectedUserId, setSelectedUserId] = useState<string | null>();

  const {
    data: progressData,
    loading: progressLoading,
    error: progressError,
  } = useGetUserProgressQuery({
    variables: { userId: selectedUserId! },
    skip: !selectedUserId,
  });

  useEffect(() => {
    if (selectedUserId) {
      console.log("Selected User ID:", selectedUserId);
    }
    if (!selectedUserId && usersData?.getUsers.length) {
      setSelectedUserId(usersData.getUsers[0].id);
    }
  }, [usersData, selectedUserId]);

  if (usersLoading || progressLoading)
    return <p>Loading users and progress...</p>;
  if (usersError) return <p>Error loading users: {usersError.message}</p>;
  if (progressError)
    return <p>Error loading progress: {progressError.message}</p>;

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    router.push(`/graph/${userId}`);
  };

  const userProgress = progressData?.getUserProgress || [];
  console.log("Progress Data:", progressData);

  const totalQuestions = userProgress.length;
  const correctAnswers = userProgress.filter((item) => item.isCorrect).length;
  const percentage =
    totalQuestions === 0
      ? 0
      : Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-3xl font-bold text-[rgba(121,4,210,0.94)] mb-6 text-center">
        2I Students
      </h2>

      <div className="space-y-4">
        {usersData?.getUsers.map((user) => {
          const isSelected = user.id === selectedUserId;

          const thisUserProgress =
            user.id === selectedUserId ? userProgress : [];

          const thisTotal = thisUserProgress.length;
          const thisCorrect = thisUserProgress.filter(
            (p) => p.isCorrect
          ).length;
          const thisPercentage =
            thisTotal === 0 ? 0 : Math.round((thisCorrect / thisTotal) * 100);

          return (
            <div
              key={user.id}
              className={`flex justify-between items-center w-full p-4 rounded-lg cursor-pointer transition
                ${
                  isSelected
                    ? "bg-[rgba(121,4,210,0.94)] shadow-lg"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              onClick={() => handleUserClick(user.id)}
            >
              <p
                className={`text-xl font-medium ${
                  isSelected ? "text-white" : "text-gray-800"
                }`}
              >
                {user.name}
              </p>

              {thisTotal > 0 ? (
                <div className="flex space-x-6 items-center">
                  <div className="text-sm text-white">
                    <p>Нийт асуулт: {thisTotal}</p>
                    <p>Зөв хариулт: {thisCorrect}</p>
                    <p>Хувь: {thisPercentage}%</p>
                  </div>
                  <div className="w-16 h-16">
                    <CorrectIncorrectPieChart
                      correct={thisCorrect}
                      incorrect={thisTotal - thisCorrect}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Оноо байхгүй</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
