"use client";

import { Button } from "@/components/ui/button";
import { useGetUsersQuery } from "../../graphql/generated";
import CreateUserForm from "./login/_components/user-form";

const Home = () => {
  const { data } = useGetUsersQuery();

  console.log(data?.getUsers);

  return (
    <div className="">
      <Button variant="outline">Addd</Button>
    </div>
  );
};

export default Home;
