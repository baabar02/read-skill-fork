import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddTopic } from "./_Components/AddTopic";

const CreateTopic = () => {
  return (
    <Card className="p-2 md:p-10 h-screen">
      <CardContent className="flex flex-col gap-4">
        <CardHeader>
          <CardTitle>Шинэ өгүүллэг нэмэх</CardTitle>
        </CardHeader>
        <AddTopic />
      </CardContent>
    </Card>
  );
};

export default CreateTopic;
