import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  score?: number;
  errors?: string[];
}

const AIConversation: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Dữ liệu tĩnh
  const sendMessageToAI = async (message: string) => {
    // Giả lập phản hồi từ AI
    return new Promise<{ message: string; score?: number; errors?: string[] }>(
      (resolve) => {
        setTimeout(() => {
          resolve({
            message:
              'AI: Tôi đã nhận được tin nhắn của bạn: "' + message + '".',
            score: 85,
            errors: message.includes("coffee")
              ? []
              : ["Phát âm từ 'coffee' chưa đúng."],
          });
        }, 1000);
      }
    );
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Chào AI lần đầu tiên
    if (messages.length === 0) {
      setMessages([
        {
          id: Date.now().toString(),
          text: 'Xin chào! Tôi là trợ lý AI. Hãy nói câu "I would like to order a cup of coffee, please." để luyện tập.',
          sender: "ai",
        },
      ]);
    }
  }, [messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAudioInput = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    // Giả lập ghi âm và gửi tin nhắn cho AI (bạn có thể thay thế bằng API ghi âm thực tế)
    const audioMessage = "I would like to order a cup of coffee, please."; // Ví dụ tin nhắn ghi âm

    // Thêm tin nhắn của người dùng vào giao diện
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: audioMessage,
        sender: "user",
      },
    ]);

    try {
      const response = await sendMessageToAI(audioMessage);

      // Thêm phản hồi của AI vào giao diện sau khi AI trả lời
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: response.message,
          sender: "ai",
          score: response.score,
          errors: response.errors,
        },
      ]);
    } catch (error) {
      console.error("Error sending message to AI:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại sau.",
          sender: "ai",
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="conversation-container mb-8 ">
      <div className="p-6 border-[#2c1950] border bg-[#171422] rounded-[10px]">
        <div className="flex items-center mb-4 ">
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
          <h2 className="text-xl font-semibold ai-title-gradient text-[#8465d0]">
            Hội thoại với AI
          </h2>
        </div>

        <p className="text-gray-300 mb-4">
          Luyện tập các kỹ năng giao tiếp với trợ lý AI thông minh. AI sẽ hỗ trợ
          luyện phát âm và phản hồi ngay lập tức.
        </p>

        {/* Chat Interface */}
        <div className="bg-[#13111C] rounded-lg mb-4 p-4 h-64 overflow-y-auto custom-scrollbar">
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
                className={`conversation-message ${
                  msg.sender === "user"
                    ? "conversation-user-message"
                    : "conversation-ai-message"
                } p-3 max-w-[80%]`}
              >
                {msg.sender === "user" &&
                msg.errors &&
                msg.errors.length > 0 ? (
                  <div>
                    {/* Hiển thị tin nhắn với lỗi được highlight */}
                    {msg.text.split(" ").map((word, index) => {
                      return (
                        <span key={index} className="mr-1">
                          {word}
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

        {/* Button ghi âm */}
        <div className="flex justify-center">
          <Button
            onClick={handleAudioInput}
            disabled={isProcessing}
            className={`bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              isProcessing ? "animate-pulse" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm4.5-3a4.5 4.5 0 0 1-9 0H6a6 6 0 0 0 12 0h-1.5zM11 17.9V20h2v-2.1a8.001 8.001 0 0 0 6.708-7.4H17.5a6.5 6.5 0 0 1-13 0H4.292a8.001 8.001 0 0 0 6.708 7.4z" />
            </svg>
            Ghi âm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIConversation;
