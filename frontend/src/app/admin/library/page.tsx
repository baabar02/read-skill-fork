"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Topics } from "./_Components/Topics";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
          <Button
            type="button"
            onClick={handlePush}
            className="bg-[#737373]/60 backdrop-blur-xl border-white/10"
          >
            <Plus />
            Өгүүллэг нэмэх
          </Button>
        </CardHeader>
      </CardContent>

      <Topics />
    </Card>
  );
};

export default Library;
