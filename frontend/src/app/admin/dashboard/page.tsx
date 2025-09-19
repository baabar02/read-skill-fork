import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Topics } from "../library/_Components/Topics";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UsersInfo } from "./_components/users";

const Dashboard = () => {
  return (
    <div className="">
      <Card className="p-2 md:p-10 h-screen">
        <UsersInfo />
      </Card>
    </div>
  );
};

export default Dashboard;
