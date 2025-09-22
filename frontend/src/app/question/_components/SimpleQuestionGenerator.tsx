"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Brain, CheckCircle } from "lucide-react";

// GraphQL imports
import { GenerateMcqQuestionsDocument } from "../../../../graphql/generated";

export default function SimpleQuestionGenerator() {
  const [content, setContent] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [generateQuestions] = useMutation(GenerateMcqQuestionsDocument);

  const handleGenerate = async () => {
    if (!content.trim()) {
      setErrorMessage("Please enter some content to generate questions from");
      return;
    }

    setIsGenerating(true);
    setErrorMessage("");
    setQuestions([]);

    try {
      const result = await generateQuestions({
        variables: {
          chapter: content.trim(),
        },
      });

      if (result.data?.generateQuestions) {
        setQuestions(result.data.generateQuestions);
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      setErrorMessage("Failed to generate questions. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setContent("");
    setQuestions([]);
    setErrorMessage("");
  };

  return (
    <Card className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-50 to-teal-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
          <Brain className="w-6 h-6" />
          Simple Question Generator
        </CardTitle>
        <p className="text-center text-gray-600">
          Generate questions from any text content
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {errorMessage && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        {questions.length === 0 ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="content">Text Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter the text content you want to generate questions from..."
                className="min-h-[150px]"
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !content.trim()}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Questions...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5 mr-2" />
                  Generate Questions
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 mx-auto text-green-600 mb-2" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Generated Questions ({questions.length})
              </h3>
            </div>

            <div className="space-y-3">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500"
                >
                  <div className="flex items-start gap-3">
                    <span className="bg-green-100 text-green-800 font-bold px-2 py-1 rounded-full text-sm min-w-[2rem] text-center">
                      {index + 1}
                    </span>
                    <p className="text-gray-800 font-medium">{question}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={handleReset}
                variant="outline"
                className="bg-white hover:bg-gray-50"
              >
                Generate New Questions
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
