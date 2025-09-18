import { Answer } from "../../models/answer-model";
import { Question } from "../../models/question-model";

export const submitAnswer = async (
  _: unknown,
  args: {
    questionId: string;
    userId?: string;
    userAnswer: string;
    bookId?: string;
    chapterId?: string;
  }
) => {
  try {
    const questionDoc = await Question.findById(args.questionId).exec();
    if (!questionDoc) {
      throw new Error("Question not found");
    }

    const question = questionDoc as any;

    const isCorrect = question.answer === args.userAnswer;

    const answer = new Answer({
      questionId: args.questionId,
      answer: args.userAnswer,
      isCorrect: isCorrect,
    });

    await answer.save();

    let parsedOptions = question.option || null;
    // const result = {
    //   id: answer._id,
    //   questionId: args.questionId,
    //   userAnswer: args.userAnswer,
    //   correctAnswer: question.answer,
    //   isCorrect: isCorrect,
    //   options: parsedOptions
    //     ? {
    //         options: parsedOptions.options || [],
    //         explanation: parsedOptions.explanation || "",
    //       }
    //     : {
    //         options: [],
    //         explanation: "",
    //       },
    //   explanation: parsedOptions?.explanation || "",
    // };

    let options = null;

    if (parsedOptions && Array.isArray(parsedOptions.options)) {
      options = {
        options: parsedOptions.options,
        explanation: parsedOptions.explanation || "",
      };
    }

    return {
      id: answer._id,
      questionId: args.questionId,
      userAnswer: args.userAnswer,
      correctAnswer: question.answer,
      isCorrect: isCorrect,
      options: options,
      explanation: parsedOptions?.explanation || "",
    };

    // return result;
  } catch (error: any) {
    console.error("Error submitting answer:", error);
    throw new Error(error.message || "Failed to submit answer");
  }
};
