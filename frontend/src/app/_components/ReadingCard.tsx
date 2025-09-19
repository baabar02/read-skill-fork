"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface ReadingCardProps {
  onClose: () => void;
}

export const ReadingCard = ({ onClose }: ReadingCardProps) => {
  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-xl" onClick={handleCardClick}>
      <CardHeader>
        <CardTitle className="text-2xl text-black">Цагаан морь</CardTitle>
        <CardDescription className="text-lg text-gray-600">
          Монгол үлгэр
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-black mb-2">Агуулга:</h3>
          <p className="text-black leading-relaxed">
            Нэгэн удаа нэгэн залуу хүн цагаан морийг харж байв. Тэр морь маш
            сайхан, цагаан өнгөтэй байв. Залуу хүн тэр морийг барихыг хүсэв.
            Гэвч морь түүний ойртож ирэхэд зугтаж байв. Залуу хүн тэвчээртэйгээр
            хүлээж байв. Эцэстээ тэр морь түүний ойртож ирэв. Залуу хүн тэр
            морийг бариж авч, түүнтэй хамт аялж байв.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Бүлэг: 1</span>
          <span>•</span>
          <span>Ангилал: үлгэр, монгол</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <Button variant="outline" onClick={onClose} className="text-black">
          Хаах
        </Button>
        <Button className="bg-gray-800 hover:bg-gray-900 text-white">
          Асуулт хариулах
        </Button>
      </CardFooter>
    </Card>
  );
};
