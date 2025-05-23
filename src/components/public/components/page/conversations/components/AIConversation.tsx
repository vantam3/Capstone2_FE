// components/AIConversation.tsx
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  score?: number;
  errors?: string[];
  audioUrl?: string;
}

const AIConversation: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sharedAudioRef = useRef<HTMLAudioElement | null>(null);
  const [currentAudioSrc, setCurrentAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: Date.now().toString(),
          text: 'Hello! How can I assist you today?',
          sender: "ai",
        },
      ]);
    }
  }, [messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      setRecordedBlob(audioBlob);
      setUserAudioUrl(URL.createObjectURL(audioBlob));
      setIsRecording(false);
    };

    setIsRecording(true);
    mediaRecorder.start();
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  const handleSendToBackend = async () => {
    if (!recordedBlob) {
      alert("Please record your voice first.");
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();
    formData.append("audio_file", new File([recordedBlob], "user_audio.webm"));

    try {
      const res = await fetch("http://127.0.0.1:8000/api/dialogue/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const aiMessageId = Date.now().toString();

      setMessages((prev) => [
        ...prev,
        {
          id: aiMessageId,
          text: data.ai_text || "AI feedback",
          sender: "ai",
          score: data.score,
          errors: data.errors,
          audioUrl: data.ai_audio_url || "",
        },
      ]);

      if (data.ai_audio_url) {
        setCurrentAudioSrc(data.ai_audio_url);
        setIsPlaying(true);
        setTimeout(() => {
          sharedAudioRef.current?.play().catch((err) =>
            console.warn("Auto-play error:", err)
          );
        }, 100);
      }

    } catch (error) {
      console.error("Error sending message to AI:", error);
      alert("Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="conversation-container mb-8">
      <div className="p-6 border-[#2c1950] border bg-[#171422] rounded-[10px]">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-semibold text-[#8465d0]">
            Conversation with AI
          </h2>
        </div>

        <div className="bg-[#13111C] rounded-lg mb-4 p-4 h-64 overflow-y-auto custom-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex mb-4 ${msg.sender === "user" ? "justify-end" : ""}`}
            >
              <div
                className={`p-3 max-w-[80%] rounded-lg text-white ${
                  msg.sender === "user" ? "bg-purple-600" : "bg-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <p className="whitespace-pre-line">{msg.text}</p>
                  {msg.sender === "ai" && msg.audioUrl && (
                    <button
                      onClick={() => {
                        if (msg.audioUrl) {
                          setCurrentAudioSrc(msg.audioUrl);
                          setIsPlaying(true);
                          setTimeout(() => sharedAudioRef.current?.play(), 0);
                        }
                      }}
                      className="ml-2 text-sm text-white hover:text-purple-300"
                      title="Replay AI Voice"
                    >
                      🔊
                    </button>
                  )}
                </div>
                {msg.score !== undefined && (
                  <p className="text-sm mt-1 text-gray-300">
                    Pronunciation Score: {msg.score}%
                  </p>
                )}
                {msg.errors && msg.errors.length > 0 && (
                  <p className="text-sm text-red-400 mt-1">
                    Errors: {msg.errors.join(", ")}
                  </p>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {isPlaying && (
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => {
                sharedAudioRef.current?.pause();
                sharedAudioRef.current!.currentTime = 0;
                setIsPlaying(false);
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Stop AI Voice
            </Button>
          </div>
        )}

        {isRecording && (
          <div className="text-center text-yellow-300 font-semibold mt-4 animate-pulse">
            🔴 Recording in progress...
          </div>
        )}

        <div className="flex justify-center gap-4 mt-4">
          <Button
            onClick={startRecording}
            disabled={isProcessing}
            className="bg-blue-600 text-white"
          >
            Record
          </Button>
          <Button
            onClick={stopRecording}
            disabled={isProcessing}
            className="bg-yellow-600 text-white"
          >
            Stop
          </Button>
          <Button
            onClick={handleSendToBackend}
            disabled={isProcessing || !recordedBlob}
            className="bg-green-600 text-white"
          >
            Send
          </Button>
        </div>

        <div className="mt-4 space-y-2">
          {userAudioUrl && (
            <div>
              <p className="text-sm text-white mb-1">Your Recording:</p>
              <audio controls src={userAudioUrl} className="w-full" />
            </div>
          )}
        </div>

        {/* Hidden shared audio for AI */}
        <audio
          ref={sharedAudioRef}
          src={currentAudioSrc || undefined}
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
};

export default AIConversation;
