import { Types } from "mongoose";
import { Transcription } from "../../models/audio-model";
import { Question } from "../../models/question-model";
import { transcribeChimege } from "../../utils/chimege";
import { compareTextSimilarity } from "../../utils/gemini";
import dotenv from "dotenv";
dotenv.config();
export const transcribeAudio = async (
  _: unknown,
  args: { userId: string; bookId: string; audioBase64: string }
) => {
  const { userId, bookId, audioBase64 } = args;

  const book = await Question.findById(bookId);
  if (!book) throw new Error("Book not exist");

  const audioBuffer = Buffer.from(audioBase64, "base64");
  const base64String = audioBuffer.toString("base64");

  const transcribedText = await transcribeChimege(base64String);
  const bookContentAsString = book.text;
  const similarityScore = await compareTextSimilarity(
    bookContentAsString,
    transcribedText
  );
  const isCorrect = similarityScore >= 80;

  const newTranscription = await Transcription.create({
    userId: new Types.ObjectId(userId),
    bookId: new Types.ObjectId(bookId),
    text: transcribedText,
    wordCount: transcribedText.split(/\s+/).length,
    duration: 0,
    isCorrect: isCorrect,
    score: similarityScore,
  });

  return newTranscription;
};
