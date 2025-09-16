"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface ReadingTestContainerProps {
  onClose: () => void;
}

type TestStep =
  | "waiting"
  | "selectTime"
  | "reading"
  | "finished"
  | "askCompletion"
  | "retry";

export const ReadingTestContainer = ({
  onClose,
}: ReadingTestContainerProps) => {
  const [currentStep, setCurrentStep] = useState<TestStep>("waiting");
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isBlurred, setIsBlurred] = useState(false);
  const [waitingCountdown, setWaitingCountdown] = useState(10);
  const [isRetry, setIsRetry] = useState(false);
  const [actualTimeTakenInSeconds, setActualTimeTakenInSeconds] = useState<
    number | null
  >(null);
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0);

  // 10 секунд хүлээх
  useEffect(() => {
    if (currentStep === "waiting") {
      const timer = setInterval(() => {
        setWaitingCountdown((prev) => {
          if (prev <= 1) {
            setCurrentStep("selectTime");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentStep]);

  // Унших хугацаа
  useEffect(() => {
    if (currentStep === "reading" && selectedTime) {
      setTimeLeft(selectedTime * 60); // минут -> секунд
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Хугацаа дуусах үед нийт хугацааг тооцоолох
            const timeSpent = selectedTime * 60;
            setTotalTimeSpent((prevTotal) => prevTotal + timeSpent);
            setCurrentStep("askCompletion");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentStep, selectedTime]);

  const handleTimeSelect = (minutes: number) => {
    setSelectedTime(minutes);
    setIsBlurred(true);
    setCurrentStep("reading");
    // Эхний хугацаа сонгох үед нийт хугацааг эхлүүлэх
    if (!isRetry) {
      setTotalTimeSpent(0);
    }
  };

  const handleCompletionResponse = (completed: boolean) => {
    if (completed) {
      setCurrentStep("finished");
    } else {
      setIsRetry(true);
      setCurrentStep("retry");
    }
  };

  const handleRetryTimeSelect = (minutes: number) => {
    setSelectedTime(minutes);
    setIsBlurred(true);
    setCurrentStep("reading");
    // Дахин унших үед нийт хугацааг хадгалах
  };

  const handleFinishEarly = () => {
    if (selectedTime !== null) {
      const timeTaken = selectedTime * 60 - timeLeft;
      const totalTime = totalTimeSpent + timeTaken;
      setActualTimeTakenInSeconds(totalTime);
      setCurrentStep("finished");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatSecondsToMinutesAndSeconds = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} минут ${seconds} секунд`;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const renderContent = () => (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold text-black mb-2">Агуулга:</h3>
      <p className="text-black leading-relaxed">
        Нэгэн удаа нэгэн залуу хүн цагаан морийг харж байв. Тэр морь маш сайхан,
        цагаан өнгөтэй байв. Залуу хүн тэр морийг барихыг хүсэв. Гэвч морь
        түүний ойртож ирэхэд зугтаж байв. Залуу хүн тэвчээртэйгээр хүлээж байв.
        Эцэстээ тэр морь түүний ойртож ирэв. Залуу хүн тэр морийг бариж авч,
        түүнтэй хамт аялж байв.
      </p>
    </div>
  );

  const renderMetadata = () => (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <span>Бүлэг: 1</span>
      <span>•</span>
      <span>Ангилал: үлгэр, монгол</span>
    </div>
  );

  const renderTimeButtons = (
    times: number[],
    labels: string[],
    onSelect: (time: number) => void
  ) => (
    <div className="flex gap-4 justify-center">
      {times.map((time, index) => (
        <Button
          key={time}
          onClick={() => onSelect(time)}
          className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3"
        >
          {labels[index]}
        </Button>
      ))}
    </div>
  );

  return (
    <Card
      className="max-w-2xl mx-auto shadow-xl max-h-[90vh] overflow-y-auto"
      onClick={handleCardClick}
    >
      <CardHeader>
        <CardTitle className="text-2xl text-black">Цагаан морь</CardTitle>
        <CardDescription className="text-lg text-gray-600">
          Монгол үлгэр
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {currentStep === "waiting" && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="text-6xl font-bold text-black mb-4">
                {waitingCountdown}
              </div>
              <p className="text-lg text-gray-600">
                Та эхээ хэдэн минутанд уншихаа тооцоолно уу?
              </p>
            </div>
            {renderContent()}
            {renderMetadata()}
          </div>
        )}

        {currentStep === "selectTime" && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <h3 className="text-xl font-semibold text-black mb-6">
                Хэдэн минутанд унших боломжтой вэ?
              </h3>
              {renderTimeButtons(
                [1, 5, 10],
                ["3 минут", "5 минут", "10 минут"],
                handleTimeSelect
              )}
            </div>
            <div className="blur-sm">{renderContent()}</div>
            {renderMetadata()}
          </div>
        )}

        {currentStep === "reading" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold text-black">
                Хугацаа: {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-500">{selectedTime} минут</div>
            </div>
            {renderContent()}
            {renderMetadata()}
            <div className="flex justify-end">
              <Button
                onClick={handleFinishEarly}
                className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3"
              >
                Уншиж дууссан
              </Button>
            </div>
          </div>
        )}

        {currentStep === "askCompletion" && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="text-xl font-semibold text-black mb-4">
              Хугацаа дууслаа!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Та эхээ бүрэн уншиж дууссан уу?
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => handleCompletionResponse(true)}
                className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3"
              >
                Тийм, дууссан
              </Button>
              <Button
                onClick={() => handleCompletionResponse(false)}
                className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3"
              >
                Үгүй, дуусаагүй
              </Button>
            </div>
          </div>
        )}

        {currentStep === "retry" && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <h3 className="text-xl font-semibold text-black mb-6">
                Эхийг дахин уншиж үзэх үү?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Хугацаа сонгоод дахин уншиж үзээрэй:
              </p>
              {renderTimeButtons(
                [1, 5, 7],
                ["2 минут", "5 минут", "7 минут"],
                handleRetryTimeSelect
              )}
            </div>
            <div className="blur-sm">{renderContent()}</div>
            {renderMetadata()}
          </div>
        )}

        {currentStep === "finished" && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-lg text-gray-600 mb-6">
              {actualTimeTakenInSeconds !== null
                ? `Та ${formatSecondsToMinutesAndSeconds(
                    actualTimeTakenInSeconds
                  )} дотор үлгэрийг уншсан байна.`
                : `Та ${formatSecondsToMinutesAndSeconds(
                    totalTimeSpent
                  )} дотор үлгэрийг уншсан байна.`}
            </p>
            <p className="text-sm text-gray-500">
              Дараагийн шат руу шилжих бэлэн байна.
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <Button variant="outline" onClick={onClose} className="text-black">
          Хаах
        </Button>
        {currentStep === "finished" && (
          <Button className="bg-gray-600 hover:bg-gray-700 text-white">
            Дараагийн шат
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
