"use client";

import React, { useEffect, useState } from "react";
import { useGenerateUserAnalysisMutation } from "../../../../graphql/generated";
import { useParams } from "next/navigation";

type SkillAssessment = {
  skill: string;
  subSkill?: string | null;
  score: number;
  level: string;
  feedback?: string | null;
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

type GenerateUserAnalysisResponse = {
  analysis: Analysis | null | undefined;
  message: string;
  success: boolean;
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
      const result: GenerateUserAnalysisResponse = {
        ...data.generateUserAnalysis,
        analysis: data.generateUserAnalysis.analysis ?? null,
      };

      setAnalysisData(result.analysis ?? null);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!analysisData) {
    return (
      <div>No analysis data available. {message && `Message: ${message}`}</div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Анализ</h2>

        <p>Overall Score: {analysisData.overallScore}</p>
        <p>Confidence: {analysisData.confidence}</p>
        <p>
          Analysis Date:{" "}
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

        {/* <p className="mt-6 text-sm text-gray-600">Message: {message}</p>
        <p>Status: {success ? "Success" : "Failed"}</p> */}
      </div>
    </div>
  );
}
