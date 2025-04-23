import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PronunciationErrorType {
  word: string;
  errorDescription: string;
  suggestion: string;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  score?: number;
  errors?: PronunciationErrorType[];
}

const AIConversation: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Tin nhắn chào ban đầu từ AI
    if (messages.length === 0) {
      setMessages([
        {
          id: Date.now().toString(),
          text: 'Xin chào! Tôi là trợ lý AI. Hãy nói câu "I would like to order a cup of coffee, please." để luyện tập.',
          sender: "ai",
        },
      ]);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (message.trim() === "" || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsProcessing(true);

    setTimeout(() => {
      // Mô phỏng đánh giá phát âm
      const sampleErrors: PronunciationErrorType[] = [
        {
          word: "coffee",
          errorDescription: "Từ này phát âm chưa rõ âm /k/.",
          suggestion: "Hãy thử nhấn mạnh âm đầu /kɔː.fiː/.",
        },
      ];
      const simulatedScore = 76;
      const aiResponse = "Cảm ơn bạn! Đây là phản hồi cho câu vừa nói.";

      // Cập nhật điểm và lỗi cho tin nhắn của user
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === userMessage.id
            ? { ...msg, score: simulatedScore, errors: sampleErrors }
            : msg
        )
      );

      // Thêm phản hồi từ AI
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          sender: "ai",
        },
      ]);

      setIsProcessing(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="bg-[#1E1A2B] rounded-xl overflow-hidden mb-8">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#A78BFA] mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 01-.659 1.591L9.5 14.5m0-11.313V3.1a1.125 1.125 0 011.125-1.125h3.75a1.125 1.125 0 011.125 1.125v.637m-1.5-1.5h3.75a1.125 1.125 0 011.125 1.125v.637m-1.5-1.5V8.57m-1.5 5.93V8.57"
            />
          </svg>
          <h2 className="text-xl font-semibold">Hội thoại với AI</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Luyện tập các kỹ năng giao tiếp với trợ lý AI thông minh. AI sẽ hỗ trợ
          luyện phát âm và phản hồi ngay lập tức.
        </p>

        {/* Chat Interface */}
        <div className="bg-[#13111C] rounded-lg mb-4 p-4 h-64 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex mb-4 ${
                msg.sender === "user" ? "justify-end" : ""
              }`}
            >
              {msg.sender === "ai" && (
                <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center mr-3 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              )}

              <div
                className={`${
                  msg.sender === "user"
                    ? "bg-[#5B21B6] bg-opacity-20 rounded-lg rounded-tr-none"
                    : "bg-[#1E1A2B] rounded-lg rounded-tl-none"
                } p-3 max-w-[80%]`}
              >
                {msg.sender === "user" &&
                msg.errors &&
                msg.errors.length > 0 ? (
                  <div>
                    {/* Hiển thị tin nhắn với lỗi được highlight */}
                    {msg.text.split(" ").map((word, index) => {
                      const error = msg.errors?.find((e) =>
                        word.toLowerCase().includes(e.word.toLowerCase())
                      );

                      return (
                        <span key={index} className="mr-1">
                          {error ? (
                            <span
                              className="bg-red-500 bg-opacity-20 border-b border-red-400 relative group cursor-pointer"
                              title={error.errorDescription}
                            >
                              {word}
                              <span className="hidden group-hover:block absolute bottom-full left-0 bg-[#13111C] text-xs p-2 rounded border border-red-400 w-56 z-10">
                                <span className="font-bold text-red-400">
                                  Lỗi:{" "}
                                </span>
                                {error.errorDescription}
                                <br />
                                <span className="font-bold text-[#A78BFA]">
                                  Gợi ý:{" "}
                                </span>
                                {error.suggestion}
                              </span>
                            </span>
                          ) : (
                            word
                          )}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <p>{msg.text}</p>
                )}

                {msg.sender === "user" && msg.score !== undefined && (
                  <div className="mt-2 text-xs text-gray-400 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 mr-1 ${
                        msg.score >= 80 ? "text-green-500" : "text-yellow-500"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Phát âm {msg.score >= 80 ? "tốt" : "cần cải thiện"}:{" "}
                    {msg.score}%
                    {msg.errors && msg.errors.length > 0 && (
                      <span className="ml-1 text-red-400">
                        {" "}
                        - {msg.errors.length} lỗi phát âm
                      </span>
                    )}
                  </div>
                )}
              </div>

              {msg.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center ml-3 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <Button
            className="bg-[#5B21B6] hover:bg-[#8B5CF6] text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors"
            onClick={() => {}}
          >
            {/* Remove mic button functionality since we're using static data */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </Button>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tin nhắn hoặc nhấn vào biểu tượng mic để nói..."
            className="w-full bg-[#13111C] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5B21B6]"
            disabled={isProcessing}
          />
          <Button
            className="bg-[#5B21B6] hover:bg-[#8B5CF6] text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors"
            onClick={sendMessage}
            disabled={isProcessing || message.trim() === ""}
          >
            {isProcessing ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIConversation;
