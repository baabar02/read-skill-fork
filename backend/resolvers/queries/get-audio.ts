import { Transcription } from "../../models/audio-model";

export const getTranscriptions = async (
  _: unknown,
  { userId }: { userId: string }
) => {
  return await Transcription.find({ userId }).sort({ createdAt: -1 });
};

export const getTranscription = async (_: unknown, { id }: { id: string }) => {
  const transcription = await Transcription.findById(id);
  if (!transcription) {
    throw new Error("Транскрипци олдсонгүй.");
  }
  return transcription;
};
