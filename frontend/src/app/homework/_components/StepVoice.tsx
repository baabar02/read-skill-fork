"use client";

import React, { useEffect, useState, useRef } from "react";
import { gql, useMutation } from "@apollo/client";

interface StepVoiceProps {
  onFinish: () => void;
}

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

export default function StepVoice({ onFinish }: StepVoiceProps) {
  const [counter, setCounter] = useState(3);
  const [showVoice, setShowVoice] = useState(false);

  // === Transcription state ===
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transcriptResult, setTranscriptResult] = useState<{
    text: string;
    isCorrect: boolean;
    score: number;
  } | null>(null);

  const audioChunksRef = useRef<Blob[]>([]);
  const [transcribeAudio, { loading: mutationLoading }] = useMutation(
    TRANSCRIBE_AUDIO_MUTATION
  );

  // Countdown
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowVoice(true);
    }
  }, [counter]);

  const startRecording = async () => {
    setTranscriptResult(null);
    audioChunksRef.current = [];
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setStream(mediaStream);

      const mediaRecorder = new MediaRecorder(mediaStream, { mimeType });

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        setLoading(true);

        if (audioChunksRef.current.length === 0) {
          alert("Яриа бичигдээгүй байна. Дахин оролдоно уу.");
          setLoading(false);
          return;
        }

        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64data = (reader.result as string)?.split(",")[1] || "";
          try {
            const { data } = await transcribeAudio({
              variables: {
                userId: "68c7a0a49f6ae7515b7f0508",
                bookId: "68c7a4a33571925f591602ea",
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
            alert("Транскрипци хийхэд алдаа гарлаа.");
          } finally {
            setLoading(false);
          }
        };
      };

      mediaRecorder.start();
      setRecorder(mediaRecorder);
      setIsRecording(true);
    } catch {
      alert("Микрофонд хандах зөвшөөрөл олгоно уу.");
    }
  };

  const stopRecording = () => {
    if (recorder && isRecording) {
      recorder.stop();
      stream?.getTracks().forEach((t) => t.stop());
      setIsRecording(false);
    }
  };

  if (!showVoice) {
    return (
      <div className="max-w-2xl bg-gradient-to-r from-blue-50 to-indigo-50/80 rounded-3xl p-8 shadow-2xl text-center flex flex-col items-center gap-6">
        <p className="text-lg md:text-xl text-gray-800 font-semibold">
          Үлгэрээс юу ойлгосноо надад яриад өгөөрэй
        </p>
        <p className="text-5xl font-bold text-gray-700">{counter}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl bg-white/90 rounded-2xl p-6 shadow-lg text-center flex flex-col items-center gap-6">
      {/* Микрофон бичлэг хийх товч */}
      {!transcriptResult && (
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={loading || mutationLoading}
          className={`px-6 py-3 rounded-full text-white font-semibold transition-colors ${
            isRecording
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading || mutationLoading
            ? "Хувиргаж байна..."
            : isRecording
            ? "Бичлэгийг зогсоох"
            : "Ярьж эхлэх"}
        </button>
      )}

      {/* Транскрипцийн үр дүн */}
      {transcriptResult && (
        <>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow w-full max-w-md text-left">
            <p className="font-semibold">Текст:</p>
            <p className="text-gray-800">{transcriptResult.text}</p>
            <p
              className={`mt-2 inline-block px-3 py-1 text-sm rounded-full text-white ${
                transcriptResult.isCorrect ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {transcriptResult.isCorrect ? "Зөв хариулсан" : "Буруу хариулсан"}
            </p>
            <p className="mt-2 font-bold">Үнэлгээ: {transcriptResult.score}%</p>
          </div>

          {/* Дууслаа товч зөвхөн энд гарна */}
          <p className="text-lg text-gray-800 mt-4">Баярлалаа</p>
          <button
            onClick={onFinish}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl shadow transition"
          >
            Дууслаа
          </button>
        </>
      )}
    </div>
  );
}
