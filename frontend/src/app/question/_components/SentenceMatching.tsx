"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const SENTENCE_PARTS = [
  "Манай найзын",
  "дата дуусаж,",
  "хичээл хийх ээ болив."
];

const COLORS = ["bg-red-400", "bg-blue-400", "bg-green-400"];

export default function EasySentenceBuilder() {
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);

  const toggleSelect = (part: string) => {
    if (selectedOrder.includes(part)) {
      setSelectedOrder(selectedOrder.filter((p) => p !== part));
    } else {
      setSelectedOrder([...selectedOrder, part]);
    }
  };

  const handleCheck = () => setRevealed(true);
  const correctOrder = SENTENCE_PARTS;

  return (
    <Card className="max-w-3xl mx-auto p-4 space-y-6 bg-yellow-50">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center ">
        ✏️ Өгүүлбэр бүтээх дасгал ✏️
      </h2>

     
      <Card className="bg-yellow-50 shadow-lg rounded-3xl border-2 border-yellow-200 min-h-[4rem] overflow-x-auto">
        <CardContent className="flex flex-wrap gap-2">
          {selectedOrder.length === 0 && (
            <div className="text-gray-950 w-full text-center">🔹 Доороос сонгож дээш оруулна уу...</div>
          )}

          {selectedOrder.map((part, idx) => (
            <Button
              key={part}
              className={`inline-block px-3 py-2 rounded-xl text-sm whitespace-nowrap  ${
                COLORS[idx % COLORS.length]
              } ${revealed ? (part === correctOrder[idx] ? "bg-green-400 text-gray-950" : "bg-red-400 text-black line-through") : ""}`}
              onClick={() => toggleSelect(part)}
            >
              {part}
            </Button>
          ))}
        </CardContent>
      </Card>

      
      <div className="flex flex-col gap-2">
        {SENTENCE_PARTS.map((part, idx) => (
          <Button
            key={part}
            className={`py-3 text-lg rounded-xl shadow-md w-full ${
              selectedOrder.includes(part)
                ? "bg-gray-300 cursor-not-allowed"
                : COLORS[idx % COLORS.length]
            }`}
            onClick={() => toggleSelect(part)}
            disabled={selectedOrder.includes(part)}
          >
            {part}
          </Button>
        ))}
      </div>

      {/* Шалгах button */}
      <div className="flex justify-center mt-4">
        <Button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90"
          onClick={handleCheck}
          disabled={revealed || selectedOrder.length === 0}
        >
          Шалгах
        </Button>
      </div>

      {/* Үр дүн */}
      {revealed && (
        <div className="text-center mt-3 text-lg font-medium">
          {selectedOrder.every((p, i) => p === correctOrder[i])
            ? "🎉 Маш сайн! Өгүүлбэр зөв дарааллаар байна!"
            : "😅 Зарим хэсэг буруу дарааллаар байна. Дахин оролдоорой!"}
        </div>
      )}
    </Card>
  );
}
