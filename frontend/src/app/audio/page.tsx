"use client";

import { useState, useRef } from "react";
import { gql, useMutation } from "@apollo/client";

const TRANSCRIBE_AUDIO_MUTATION = gql`
  mutation TranscribeAudio($userId: ID!, $bookId: ID!, $audioBase64: String!) {
    transcribeAudio(
      userId: $userId
      bookId: $bookId
      audioBase64: $audioBase64
    ) {
      id
      text
      isCorrect
      score
    }
  }
`;

const mimeType = "audio/webm";

export default function TranscriptionPage() {
  const [permission, setPermission] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [transcriptResult, setTranscriptResult] = useState<{
    text: string;
    isCorrect: boolean;
    score: number;
  } | null>(null);

  const audioChunksRef = useRef<Blob[]>([]);

  const [transcribeAudio, { loading: mutationLoading }] = useMutation(
    TRANSCRIBE_AUDIO_MUTATION
  );

  const startRecording = async () => {
    setTranscriptResult(null);
    audioChunksRef.current = [];
    try {
      const mediaStream: MediaStream =
        await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermission(true);
      setStream(mediaStream);

      const mediaRecorder: MediaRecorder = new MediaRecorder(mediaStream, {
        mimeType,
      });

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setLoading(true);

        if (audioChunksRef.current.length === 0) {
          alert("Яриа бичигдээгүй байна. Дахин оролдоно уу.");
          setLoading(false);
          return;
        }

        const audioBlob: Blob = new Blob(audioChunksRef.current, {
          type: mimeType,
        });
        console.log("Бичлэгийн файлын хэмжээ (KB):", audioBlob.size / 1024);

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64data: string =
            (reader.result as string)?.split(",")[1] || "";

          try {
            const { data } = await transcribeAudio({
              variables: {
                userId: "68c7a0a49f6ae7515b7f0508",
                bookId: "68ca2beaf89531d138362e16",
                audioBase64: base64data,
              },
            });

            if (data?.transcribeAudio) {
              setTranscriptResult({
                text: data.transcribeAudio.text,
                isCorrect: data.transcribeAudio.isCorrect,
                score: data.transcribeAudio.score,
              });
            }
          } catch (error) {
            console.error("GraphQL мутацийн алдаа:", error);
            if (error instanceof Error) {
              alert(`Транскрипци хийхэд алдаа гарлаа: ${error.message}`);
            } else {
              alert("Тодорхойгүй алдаа гарлаа.");
            }
          } finally {
            setLoading(false);
          }
        };
      };

      mediaRecorder.start();
      setRecorder(mediaRecorder);
      setIsRecording(true);
    } catch (err) {
      alert("Микрофонд хандах зөвшөөрөл олгоно уу.");
    }
  };

  const stopRecording = () => {
    if (recorder && isRecording) {
      recorder.stop();
      stream?.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Яриаг текст болгох
      </h1>

      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-6 py-3 rounded-full text-white font-semibold transition-colors ${
          isRecording
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
        disabled={loading || mutationLoading}
      >
        {loading || mutationLoading
          ? "Хувиргаж байна..."
          : isRecording
          ? "Бичлэгийг зогсоох"
          : "Ярьж эхлэх"}
      </button>

      {transcriptResult && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md w-full max-w-xl">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            Хувиргасан текст:
          </h2>
          <p className="text-gray-700">{transcriptResult.text}</p>
          <div className="mt-4">
            <span
              className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${
                transcriptResult.isCorrect ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {transcriptResult.isCorrect ? "Зөв хариулсан" : "Буруу хариулсан"}
            </span>
            {transcriptResult.score !== undefined && (
              <p className="mt-2 text-lg font-bold text-gray-800">
                Үнэлгээ: {transcriptResult.score}%
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
