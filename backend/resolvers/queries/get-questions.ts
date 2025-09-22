import { Question } from "../../models/question-model";

export const latestQuestion = async (_: unknown) => {
  try {
    const latest = await Question.findOne().sort({ createdAt: -1 }).exec();
    if (!latest) throw new Error("No documents found");
    return latest;
  } catch (error) {
    console.error("Error fetching latest text:", error);
    throw new Error("Failed to fetch latest text");
  }
};
