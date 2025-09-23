"use client";

import React, { useEffect, useState } from "react";
import { useGenerateUserAnalysisMutation } from "../../../../graphql/generated";
import { useParams } from "next/navigation";
import CorrectIncorrectPieChart from "./_components/correct-incorrect";
import TimeBarChart from "./_components/skill-assessment-chart";
import TimeLineChart from "./_components/time-line-chart";
import SkillAssessmentChart from "./_components/skill-assessment-chart";

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

  const [generateUserAnalysis, { data, loading, error }] =
    useGenerateUserAnalysisMutation();

  useEffect(() => {
    if (userId) {
      generateUserAnalysis({ variables: { userId } });
    }
  }, [userId, generateUserAnalysis]);

  useEffect(() => {
    if (data?.generateUserAnalysis) {
      setMessage(data.generateUserAnalysis.message);
      setSuccess(data.generateUserAnalysis.success);

      const analysis = data.generateUserAnalysis.analysis ?? null;
      setAnalysisData(analysis);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!analysisData) {
    return (
      <div>No analysis data available. {message && `Message: ${message}`}</div>
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
        <p>Чанар: {analysisData.confidence}</p>
        <p>
          Дүгнэлтийн огноо:{" "}
          {new Date(analysisData.analysisDate).toLocaleDateString()}
        </p>

        <h3 className="mt-4 font-semibold">Skill Assessments</h3>
        <ul className="list-disc list-inside">
          {analysisData.skillAssessments.map((skill, i) => (
            <li key={i}>
              <strong>{skill.skill}</strong>
              {skill.subSkill ? ` / ${skill.subSkill}` : ""}: {skill.score} (
              {skill.level})
              {skill.feedback && (
                <p className="ml-4 italic">{skill.feedback}</p>
              )}
            </li>
          ))}
        </ul>

        <h3 className="mt-4 font-semibold">Strengths</h3>
        <ul className="list-disc list-inside">
          {analysisData.strengths.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <h3 className="mt-4 font-semibold">Improvements</h3>
        <ul className="list-disc list-inside">
          {analysisData.improvements.map((imp, i) => (
            <li key={i}>{imp}</li>
          ))}
        </ul>

        <h3 className="mt-4 font-semibold">Recommendations</h3>
        <ul className="list-disc list-inside">
          {analysisData.recommendations.map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </div>

      <CorrectIncorrectPieChart correct={correct} incorrect={incorrect} />

      <TimeLineChart data={lineData} />
      <SkillAssessmentChart data={analysisData.skillAssessments} />
    </div>
  );
}
