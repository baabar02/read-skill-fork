import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface QuestionGenerationRequest {
  content: string;
  difficulty: "easy" | "medium" | "hard";
  questionType: "multiple_choice" | "open_ended" | "true_false";
  numberOfQuestions: number;
  language: string;
}

export interface GeneratedQuestion {
  question: string;
  answer: string;
  options?: string[]; // For multiple choice questions
  explanation?: string;
}

export async function generateQuestions(
  request: QuestionGenerationRequest
): Promise<GeneratedQuestion[]> {
  try {
    const prompt = createPrompt(request);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert reading comprehension question generator. Generate high-quality questions based on the provided text content.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No response from AI service");
    }

    return parseAIResponse(response, request.questionType);
  } catch (error) {
    console.error("Error generating questions:", error);
    throw new Error("Failed to generate questions");
  }
}

function createPrompt(request: QuestionGenerationRequest): string {
  const { content, difficulty, questionType, numberOfQuestions, language } =
    request;

  let prompt = `Generate ${numberOfQuestions} reading comprehension questions in ${language} based on the following text:\n\n`;
  prompt += `Text: ${content}\n\n`;

  prompt += `Requirements:\n`;
  prompt += `- Difficulty: ${difficulty}\n`;
  prompt += `- Question type: ${questionType}\n`;
  prompt += `- Language: ${language}\n\n`;

  if (questionType === "multiple_choice") {
    prompt += `For each question, provide:\n`;
    prompt += `1. The question text\n`;
    prompt += `2. 4 answer options (A, B, C, D)\n`;
    prompt += `3. The correct answer (A, B, C, or D)\n`;
    prompt += `4. A brief explanation\n\n`;
    prompt += `Format your response as JSON array with this structure:\n`;
    prompt += `[{"question": "...", "options": ["A", "B", "C", "D"], "answer": "A", "explanation": "..."}]`;
  } else if (questionType === "true_false") {
    prompt += `For each question, provide:\n`;
    prompt += `1. A true/false statement\n`;
    prompt += `2. The correct answer (true or false)\n`;
    prompt += `3. A brief explanation\n\n`;
    prompt += `Format your response as JSON array with this structure:\n`;
    prompt += `[{"question": "...", "answer": "true", "explanation": "..."}]`;
  } else {
    prompt += `For each question, provide:\n`;
    prompt += `1. An open-ended question\n`;
    prompt += `2. A sample answer\n`;
    prompt += `3. Key points that should be included\n\n`;
    prompt += `Format your response as JSON array with this structure:\n`;
    prompt += `[{"question": "...", "answer": "...", "explanation": "..."}]`;
  }

  return prompt;
}

function parseAIResponse(
  response: string,
  questionType: string
): GeneratedQuestion[] {
  try {
    // Clean the response to extract JSON
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("No JSON array found in response");
    }

    const questions = JSON.parse(jsonMatch[0]);

    return questions.map((q: any) => ({
      question: q.question,
      answer: q.answer,
      options: q.options || undefined,
      explanation: q.explanation || undefined,
    }));
  } catch (error) {
    console.error("Error parsing AI response:", error);
    throw new Error("Failed to parse AI response");
  }
}
