import { Answer } from "../../models/answer-model";
import { Question } from "../../models/question-model";

// Submit an answer for a question
export const submitAnswer = async (
  _: unknown,
  args: {
    questionId: string;
    userId: string;
    userAnswer: string;
    bookId?: string;
    chapterId?: string;
  }
) => {
  try {
    // Find the question to get the correct answer
    const questionDoc = await Question.findById(args.questionId).exec();
    if (!questionDoc) {
      throw new Error("Question not found");
    }
    const question = questionDoc as any;

    // Check if answer is correct
    const isCorrect = question.answer === args.userAnswer;

    // Create answer record
    const answer = new Answer({
      bookId: args.bookId || question.bookId,
      chapterId: args.chapterId || question.chapterId,
      questionId: args.questionId,
      userId: args.userId,
      answer: args.userAnswer,
      isCorrect: isCorrect,
    });

    await answer.save();

    // Get question options for response
    let parsedOptions = null;
    if (question.option) {
      try {
        parsedOptions = JSON.parse(question.option);
      } catch (e) {
        console.error("Error parsing question options:", e);
      }
    }

    return {
      id: answer._id,
      questionId: args.questionId,
      userAnswer: args.userAnswer,
      correctAnswer: question.answer,
      isCorrect: isCorrect,
      options: parsedOptions
        ? {
            options: parsedOptions.options || [],
            explanation: parsedOptions.explanation || "",
          }
        : null,
      explanation: parsedOptions?.explanation || null,
    };
  } catch (error: any) {
    console.error("Error submitting answer:", error);
    throw new Error(error.message || "Failed to submit answer");
  }
};
