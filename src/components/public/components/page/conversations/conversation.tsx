import React from "react";
import { Badge } from "@/components/ui/badge";
import AIConversation from "@/components/public/components/page/conversations/components/AIConversation";

interface PronunciationErrorProps {
  text: string;
  errorDescription: string;
  suggestion: string;
}

const PronunciationError: React.FC<PronunciationErrorProps> = ({
  text,
  errorDescription,
  suggestion,
}) => {
  return (
    <div className="bg-[#13111C] rounded-lg p-4 mb-4 border border-red-500 border-opacity-30 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex items-center mb-2">
        <Badge
          variant="outline"
          className="bg-red-500 bg-opacity-10 text-red-400 border-red-500"
        >
          Lỗi phát âm
        </Badge>
      </div>
      <h3 className="text-lg font-medium mb-1 text-white">{text}</h3>
      <p className="text-gray-400 mb-2">{errorDescription}</p>
      <div className="bg-[#1E1A2B] p-3 rounded-md border-l-2 border-[#A78BFA]">
        <span className="text-[#A78BFA] font-medium">Gợi ý:</span> {suggestion}
      </div>
    </div>
  );
};

const ConversationPage: React.FC = () => {
  const pronunciationErrors: PronunciationErrorProps[] = [
    {
      text: "Th sound /θ/ (như trong 'think', 'three')",
      errorDescription: "Người Việt thường phát âm 't' thay vì âm 'th' (/θ/).",
      suggestion: "Đặt lưỡi giữa răng và thổi nhẹ khi phát âm 'th'.",
    },
    {
      text: "Phụ âm cuối /t/, /d/, /k/, /p/ (như trong 'cat', 'bad')",
      errorDescription: "Thường bỏ qua hoặc phát âm không rõ các phụ âm cuối.",
      suggestion:
        "Tập trung vào việc phát âm rõ ràng phụ âm cuối, đặc biệt khi nó là âm vô thanh như /t/, /k/, /p/.",
    },
    {
      text: "Nguyên âm dài và ngắn (ship vs sheep)",
      errorDescription: "Không phân biệt được giữa /ɪ/ (ngắn) và /i:/ (dài).",
      suggestion:
        "Luyện tập các cặp từ như ship/sheep, bit/beat để phân biệt độ dài của nguyên âm.",
    },
    {
      text: "Âm /r/ (như trong 'red', 'very')",
      errorDescription: "Lẫn lộn với âm /z/ hoặc /l/ trong tiếng Việt.",
      suggestion:
        "Đặt đầu lưỡi gần vòm miệng phía trên nhưng không chạm, để hơi thoát ra giữa lưỡi và vòm miệng.",
    },
    {
      text: "Trọng âm từ và câu",
      errorDescription: "Phát âm tất cả các âm tiết với cùng trọng lượng.",
      suggestion:
        "Tập trung vào việc nhấn mạnh âm tiết có trọng âm và phát âm nhẹ các âm tiết khác.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-[8rem]">
      <div className="flex items-center text-gray-400 text-sm mb-4">
        <span
          className="hover:text-white transition-colors flex items-center cursor-pointer"
          onClick={() => window.history.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Quay lại trang chủ
        </span>
      </div>

      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#A78BFA] to-[#5B21B6]">
          Hội thoại với AI và cải thiện phát âm
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Luyện tập phát âm và giao tiếp tiếng Anh với trợ lý AI thông minh.
          Nhận phản hồi ngay lập tức và cải thiện kỹ năng của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AIConversation />
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gradient-to-r from-[#1E1A2B] to-[#251D35] rounded-xl p-6 shadow-lg border border-red-500 border-opacity-20">
            <h2 className="text-xl font-semibold mb-4 flex items-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-pink-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Lỗi phát âm phổ biến
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
              {pronunciationErrors.map((err, idx) => (
                <PronunciationError key={idx} {...err} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
