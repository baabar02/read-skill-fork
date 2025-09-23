"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


import { useRouter } from "next/navigation";

import { AddTopic } from "./create-topic/_Components/AddTopic";

const Library = () => {
  const router = useRouter();
  const handlePush = () => {
    router.push("/admin/library/create-topic");
  };
  return (
    <Card className="h-screen p-2 md:p-10 ">
      <CardContent>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Өгүүллэгүүд</CardTitle>
          
        </CardHeader>
      </CardContent>

    <AddTopic />
    </Card>
  );
};

export default Library;
