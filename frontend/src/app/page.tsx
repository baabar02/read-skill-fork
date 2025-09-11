"use client";

import { Button } from "@/components/ui/button";
import { useGetUsersQuery } from "../../graphql/generated";

const Home = () => {
  const { data } = useGetUsersQuery();

  console.log(data?.getUsers);

  return (
    <div className="">
      <Button variant="outline">Add</Button>
    </div>
  );
};

export default Home;
