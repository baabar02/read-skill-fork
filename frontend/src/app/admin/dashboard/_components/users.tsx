"use client";

import { useGetUsersQuery } from "../../../../../graphql/generated";
import { useRouter } from "next/navigation";

export const UsersInfo = () => {
  const { data, loading, error } = useGetUsersQuery();
  const router = useRouter();

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleUserClick = (userId: string) => {
    router.push(`/graph/${userId}`);
  };

  return (
    <div>
      <p className="text-2xl bold">2I students</p>
      {data?.getUsers.map((user) => (
        <div
          key={user.id}
          style={{ cursor: "pointer" }}
          onClick={() => handleUserClick(user.id)}
        >
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
};
