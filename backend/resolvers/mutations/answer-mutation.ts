import { Answer } from "../../models/answer-model";
import { QuestionModel } from "../../models/question-model";

export const submitAnswer = async (
  _: unknown,
  args: {
    questionId: string;
    userId: string;
    userAnswer: string;
    bookId?: string;
  }
) => {
  try {
    const questionDoc = await QuestionModel.findById(args.questionId);

    if (!questionDoc) {
      throw new Error("Question not found");
    }

    const isCorrect = questionDoc.answer === args.userAnswer;

    const answer = new Answer({
      bookId: args.bookId || questionDoc.bookId,
      chapterId: questionDoc.chapterId,
      questionId: args.questionId,
      userId: args.userId,
      answer: args.userAnswer,
      isCorrect: isCorrect,
    });

    await answer.save();

    let options = null;
    if (questionDoc.option && Array.isArray(questionDoc.option.options)) {
      options = questionDoc.option.options;
    }

    return {
      id: answer._id,
      questionId: args.questionId,
      userAnswer: args.userAnswer,
      correctAnswer: questionDoc.answer,
      isCorrect: isCorrect,
      options: options,
    };
  } catch (error: any) {
    console.error("Error submitting answer:", error);
    throw new Error(error.message || "Failed to submit answer");
  }
};
