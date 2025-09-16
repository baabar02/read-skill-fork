"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Brain, FileText, Settings } from "lucide-react";

// Import components
import BackendConnectedQuiz from "./_components/BackendConnectedQuiz";
import BookManager from "./_components/BookManager";
import SimpleQuestionGenerator from "./_components/SimpleQuestionGenerator";
import FourOptions from "./_components/FourOptions";
import SentenceMatching from "./_components/SentenceMatching";
import BookSelector from "./_components/FourOptions";

export default function Page() {
  const [activeTab, setActiveTab] = useState("quiz");

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Reading Skill Improvement Platform
            </CardTitle>
            <p className="text-center text-blue-100">
              AI-powered learning with intelligent question generation
            </p>
          </CardHeader>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI Quiz
            </TabsTrigger>
            <TabsTrigger value="simple" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Simple Generator
            </TabsTrigger>
            <TabsTrigger value="books" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Book Manager
            </TabsTrigger>
            <TabsTrigger value="demo" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Demo Quiz
            </TabsTrigger>
            <TabsTrigger value="matching" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Sentence Matching
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quiz" className="space-y-6">
            <BackendConnectedQuiz />
          </TabsContent>

          <TabsContent value="simple" className="space-y-6">
            <SimpleQuestionGenerator />
          </TabsContent>

          <TabsContent value="books" className="space-y-6">
            <BookManager />
          </TabsContent>

          <TabsContent value="demo" className="space-y-6">
           <BookSelector/>
          </TabsContent>

          <TabsContent value="matching" className="space-y-6">
            <SentenceMatching />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
