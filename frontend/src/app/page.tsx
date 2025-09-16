"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetUsersQuery } from "../../graphql/generated";
import { ReadingTestContainer } from "./_components/ReadingTest/ReadingTestContainer";

const Home = () => {
  const { data } = useGetUsersQuery();
  const [showReadingCard, setShowReadingCard] = useState(false);

  console.log(data?.getUsers);

  return (
    <div className="">
      <Button variant="outline" onClick={() => setShowReadingCard(true)}>
        Add
      </Button>

      {showReadingCard && (
        <div
          className="fixed inset-0 bg-gray-50 bg-opacity-100 flex items-center justify-center z-50"
          onClick={() => setShowReadingCard(false)}
        >
          <ReadingTestContainer onClose={() => setShowReadingCard(false)} />
        </div>
      )}
    </div>
  );
};

export default Home;
