"use client";

import React, { useEffect, useState } from "react";
import { useGenerateUserAnalysisMutation } from "../../../../graphql/generated";
import { useParams } from "next/navigation";
import CorrectIncorrectPieChart from "./_components/correct-incorrect";
import TimeBarChart from "./_components/skill-assessment-chart";
import TimeLineChart from "./_components/time-line-chart";
import SkillAssessmentChart from "./_components/skill-assessment-chart";
import Lottie from "lottie-react";
import loading from "@/assets/illustrations/loading.json";

type SkillAssessment = {
  skill: string;
  subSkill?: string | null;
  score: number;
  level: string;
  feedback?: string | null;
  timeSpent?: number;
  attemptCount?: number;
};

type Analysis = {
  overallScore: number;
  skillAssessments: SkillAssessment[];
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  analysisDate: string;
  confidence: number;
};

export default function ChartPage() {
  const { id } = useParams();
  const userId = Array.isArray(id) ? id[0] : id;

  const [analysisData, setAnalysisData] = useState<Analysis | null>(null);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean | null>(null);

  const [generateUserAnalysis] = useGenerateUserAnalysisMutation();

  useEffect(() => {
    if (userId) {
      generateUserAnalysis({ variables: { userId } }).then((res: any) => {
        if (res.data?.generateUserAnalysis?.analysis) {
          setAnalysisData(res.data.generateUserAnalysis.analysis);
        }
        setMessage(res.data?.generateUserAnalysis?.message || "");
        setSuccess(res.data?.generateUserAnalysis?.success || false);
      });
    }
  }, [userId, generateUserAnalysis]);

  if (!analysisData) {
    return (
    <Lottie
              animationData={loading}
              loop
              autoplay
              style={{ width: 500, height: 500 }}
              className="flex justify-center items-center mx-auto"
            />
    );
  }

  const total = analysisData.skillAssessments.length;
  const correct = analysisData.skillAssessments.filter(
    (sk) => sk.score > 0
  ).length;
  const incorrect = total - correct;

  const lineData = analysisData.skillAssessments.map((sk, idx) => ({
    name: `Q${idx + 1}`,
    timeSpent: sk.timeSpent ?? 0,
    attemptCount: sk.attemptCount ?? 0,
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 space-y-6">
      <div className="max-w-4xl w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Анализ</h2>

        <p>Нийт оноо: {analysisData.overallScore}</p>

        <h3 className="mt-4 font-semibold">Ур чадварын үнэлгээ</h3>
        {analysisData.skillAssessments.length > 0 && (
          <div>
            {Object.entries(
              analysisData.skillAssessments.reduce((acc, curr) => {
                if (!acc[curr.skill]) acc[curr.skill] = [];
                acc[curr.skill].push(curr);
                return acc;
              }, {} as Record<string, SkillAssessment[]>)
            ).map(([skillName, subSkills]) => (
              <div key={skillName} className="mb-3">
                <strong className="text-lg">{skillName}</strong>
                <ul className="list-disc list-inside ml-4">
                  {subSkills.map((subSkill, idx) => (
                    <li key={idx}>
                      {subSkill.subSkill ? `${subSkill.subSkill}: ` : ""}
                      {subSkill.score} ({subSkill.level})
                      {subSkill.feedback && (
                        <p className="ml-4 italic">{subSkill.feedback}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <h3 className="mt-4 font-semibold">Сайн ур чадвар</h3>
        <ul className="list-disc list-inside">{analysisData.strengths}</ul>

        <h3 className="mt-4 font-semibold">Ажиллах ур чадвар</h3>
        <ul className="list-disc list-inside">{analysisData.improvements}</ul>

        <h3 className="mt-4 font-semibold">Зөвлөмж</h3>
        <ul className="list-disc list-inside">
          {analysisData.recommendations}
        </ul>
      </div>

      {/* <CorrectIncorrectPieChart correct={correct} incorrect={incorrect} />

      <TimeLineChart data={lineData} />
      <SkillAssessmentChart data={analysisData.skillAssessments} /> */}
    </div>
  );
}
