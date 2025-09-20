// "use client";

// import { useGetUserScoreQuery, useGetUsersQuery } from "../../../../../graphql/generated";
// import { useRouter } from "next/navigation";

// export const UsersInfo = () => {
//   const { data, loading, error } = useGetUsersQuery();

//   const router = useRouter();

//   if (loading) return <p>Loading users...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const handleUserClick = (userId: string) => {
//     router.push(`/graph/${userId}`);
//   };

//   return (
//     <div>
//       <p className="text-2xl bold">2I students</p>
//       {data?.getUsers.map((user) => (
//         <div
//           key={user.id}
//           style={{ cursor: "pointer" }}
//           onClick={() => handleUserClick(user.id)}
//         >
//           <p>{user.name}</p>
//         </div>
//       ))}
//     </div>
//   );
// };
"use client";

import {
  useGetUserScoreQuery,
  useGetUsersQuery,
} from "../../../../../graphql/generated";
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
    data: scoreData,
    loading: scoreLoading,
    error: scoreError,
  } = useGetUserScoreQuery({
    variables: { userId: selectedUserId! },
    skip: !selectedUserId,
  });

  useEffect(() => {
    if (!selectedUserId && usersData?.getUsers.length) {
      setSelectedUserId(usersData.getUsers[0].id);
    }
  }, [usersData, selectedUserId]);

  if (usersLoading || scoreLoading) return <p>Loading users and scores...</p>;
  if (usersError) return <p>Error loading users: {usersError.message}</p>;
  if (scoreError) return <p>Error loading scores: {scoreError.message}</p>;

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
    router.push(`/graph/${userId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">2I Students</h2>

      <div className="space-y-4">
        {usersData?.getUsers.map((user) => {
          const isSelected = user.id === selectedUserId;

          const userScore =
            user.id === selectedUserId ? scoreData?.getUserScore : null;

          return (
            <div
              key={user.id}
              className={`flex w-full p-4 rounded-lg cursor-pointer transition
                ${isSelected ? "bg-blue-100 shadow-lg" : "hover:bg-gray-100"}`}
              onClick={() => handleUserClick(user.id)}
            >
              <p className="text-lg font-medium">{user.name}</p>

              {userScore ? (
                <div className="flex space-x-6">
                  <div className="text-sm">
                    <p>Нийт асуулт: {userScore.totalQuestions}</p>
                    <p>Зөв хариулт: {userScore.correctAnswers}</p>
                    <p>Хувь: {userScore.percentage}%</p>
                  </div>

                  {/* <div className="w-16 h-16">
                    <CorrectIncorrectPieChart
                      correct={userScore.correctAnswers}
                      incorrect={
                        userScore.totalQuestions - userScore.correctAnswers
                      }
                    />
                  </div> */}
                </div>
              ) : (
                <p className="text-sm text-gray-400">Оноо байхгүй</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
