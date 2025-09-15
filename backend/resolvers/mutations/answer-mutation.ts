import { Answer } from "../../models/answer-model";
import { QuestionModel } from "../../models/question-model";

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
    const questionDoc = await QuestionModel.findById(args.questionId);

    if (!questionDoc) {
      throw new Error("Question not found");
    }

    // Check if answer is correct
    const isCorrect = questionDoc.answer === args.userAnswer;

    // Create answer record
    const answer = new Answer({
      bookId: args.bookId || questionDoc.bookId,
      chapterId: args.chapterId || questionDoc.chapterId,
      questionId: args.questionId,
      userId: args.userId,
      answer: args.userAnswer,
      isCorrect: isCorrect,
    });

    await answer.save();

    // Get question options for response
    let options = null;
    if (questionDoc.option) {
      try {
        options = JSON.parse(questionDoc.option);
      } catch (e) {
        console.error("Error parsing question options:", e);
      }
    }

    return {
      id: answer._id,
      questionId: args.questionId,
      userAnswer: args.userAnswer,
      correctAnswer: questionDoc.answer,
      isCorrect: isCorrect,
      options: options,
      explanation: options?.explanation || null,
    };
  } catch (error: any) {
    console.error("Error submitting answer:", error);
    throw new Error(error.message || "Failed to submit answer");
  }
};
