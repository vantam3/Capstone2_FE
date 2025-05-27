// src/components/public/components/page/challenges/Speakingtest.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { MicrophoneIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Interface cho dữ liệu trả về từ API /api/challenges/exercises/<exercise_pk>/detail/
interface ApiChallengeExerciseDetail {
  id: number;
  title: string;
  description: string;
  order: number;
  speaking_text_content: string | null; // Nội dung gốc đã decode, có thể là null
  challenge_id: number;
}

function TakeChallengeExercise() {
  const { challengeIdOrSlug, exerciseId } = useParams<{ challengeIdOrSlug: string; exerciseId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [exerciseDetail, setExerciseDetail] = useState<ApiChallengeExerciseDetail | null>(null);
  const [pageTitle, setPageTitle] = useState("Challenge Exercise"); // Sẽ lấy từ query param
  
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState("");
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null); // Blob của audio đã ghi

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  
  // Progress bar (tạm thời để 100% khi load xong)
  const [progress, setProgress] = useState(10); 

  // Lấy pageTitle từ query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const titleFromQuery = queryParams.get("title");
    if (titleFromQuery) {
      setPageTitle(decodeURIComponent(titleFromQuery));
    }
  }, [location.search]);

  // Fetch chi tiết exercise
  useEffect(() => {
    if (!exerciseId) {
      setError("Exercise ID not provided in URL.");
      setIsLoadingContent(false);
      setProgress(0);
      return;
    }
    setIsLoadingContent(true);
    setError("");
    setProgress(10); // Reset progress khi bắt đầu load

    axios.get<ApiChallengeExerciseDetail>(`http://localhost:8000/api/challenges/exercises/${exerciseId}/detail/`)
      .then(response => {
        setExerciseDetail(response.data);
        setProgress(100); // Load xong thì 100%
      })
      .catch((err) => {
        console.error("Failed to load exercise detail:", err);
        setError("Failed to load exercise content. Please try again.");
        setProgress(0); // Lỗi thì 0%
      })
      .finally(() => setIsLoadingContent(false));
  }, [exerciseId]);
  
  const setupMediaRecorder = async () => {
    if (streamRef.current && streamRef.current.active) {
        if (mediaRecorderRef.current && mediaRecorderRef.current.stream === streamRef.current) {
            return; 
        }
    }
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            const newRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' }); // Chỉ định mimeType
            mediaRecorderRef.current = newRecorder;

            newRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) audioChunksRef.current.push(event.data);
            };
            newRecorder.onstop = () => {
                const completeBlob = new Blob(audioChunksRef.current, { type: newRecorder.mimeType });
                setAudioBlob(completeBlob);
                audioChunksRef.current = [];
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                }
            };
        } catch (err) {
            console.error("Mic access error:", err);
            setError("Microphone access denied. Please check browser permissions.");
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        }
    } else {
        setError("Media API not supported.");
    }
  };

  const startRecording = async () => {
    setAudioBlob(null);
    setError("");
    await setupMediaRecorder();
    if (mediaRecorderRef.current?.state === "inactive") {
        audioChunksRef.current = [];
        mediaRecorderRef.current.start();
        setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const toggleRecording = () => isRecording ? stopRecording() : startRecording();
  
  // Không có audio mẫu cho ChallengeExercise, nên bỏ handlePlayAudio và phần audio mẫu

  const handleSubmit = () => {
    if (!audioBlob) {
      setError("No recording to submit.");
      toast.warn("No recording to submit.");
      return;
    }
    if (!exerciseId) {
      setError("Exercise ID missing.");
      toast.error("Exercise ID missing.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    const audioFile = new File([audioBlob], `challenge_exercise_${exerciseId}_attempt.webm`, { type: audioBlob.type });
    const formData = new FormData();
    formData.append("audio_file", audioFile);

    axios.post(`http://localhost:8000/api/challenges/exercises/${exerciseId}/submit_attempt/`, formData, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((res) => {
        // Backend trả về { score: number, (các thông tin feedback khác nếu có) }
        toast.success(`Submitted! Your score: ${res.data.score?.toFixed(0) || 'N/A'}`);
        // Điều hướng về trang chi tiết challenge sau khi submit
        if(challengeIdOrSlug) {
            setTimeout(() => { navigate(`/challenges/detail/${challengeIdOrSlug}`); }, 2500);
        } else { // Fallback nếu không có challengeIdOrSlug (ít khi xảy ra)
            setTimeout(() => { navigate(`/challenges`); }, 2500);
        }
      })
      .catch((err) => {
        console.error("Submit failed:", err.response || err.message || err);
        const errorMsg = err.response?.data?.error || err.response?.data?.detail || "Submission failed.";
        setError(errorMsg);
        toast.error(errorMsg);
      })
      .finally(() => setIsSubmitting(false));
  };
  
  useEffect(() => { // Cleanup stream khi component unmount
    return () => {
        if (mediaRecorderRef.current?.state === "recording") mediaRecorderRef.current.stop();
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };
  }, []);

  const contentToSpeak = exerciseDetail?.speaking_text_content && exerciseDetail.speaking_text_content !== "Error: Could not decode content."
    ? exerciseDetail.speaking_text_content
    : exerciseDetail?.description; // Fallback to description if no specific content

  return (
    <>
      <div className="mt-[6rem] sm:mt-[8rem] max-w-3xl mx-auto p-4 md:p-6">
        <h3 className="text-xl md:text-2xl font-semibold text-white">{pageTitle}</h3>
        {/* Thông tin Challenge/Exercise cơ bản */}
        {exerciseDetail && (
            <h3 className="text-gray-400 mt-1 text-sm md:text-base">Exercise: {exerciseDetail.title}</h3>
        )}
        
        {/* Progress Bar */}
        <div className="flex items-center mt-3 text-xs md:text-sm">
          <h3 className="text-gray-400">Progress</h3>
          <h3 className="text-gray-400 ml-auto">1/1 Task</h3> {/* Giả sử mỗi trang này là 1 task */}
        </div>
        <div className="w-full bg-[#4b2f8d] rounded-full h-1.5 md:h-2 mt-1">
          <div
            className="bg-[#8861ea] h-1.5 md:h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {isLoadingContent && (
            <div className="text-center py-10 text-gray-400">Loading exercise content...</div>
        )}

        {error && !isLoadingContent && (
          <div className="text-red-400 bg-red-900/30 border border-red-700 p-3 rounded-md mt-6 text-sm">
            <p>{error}</p>
          </div>
        )}

        {!isLoadingContent && exerciseDetail && !error && (
          <div className="w-full mt-6 p-4 bg-[#1a0940] border border-[#2d1674] rounded-[10px] shadow-sm sm:p-6">
            {/* Nội dung để nói */}
            <div className="w-full p-4 bg-[#230e58] border border-[#2d1674] rounded-[10px] shadow-sm sm:p-5">
              <h5 className="mb-2 text-base md:text-lg text-white font-semibold">
                Practice by speaking the following:
              </h5>
              {contentToSpeak ? (
                 <p className="text-white text-base md:text-lg font-medium bg-[#2d1674]/70 border border-[#3a2370] rounded-[10px] p-3 leading-relaxed">
                    {contentToSpeak}
                 </p>
              ) : (
                <p className="text-yellow-400 text-sm italic p-3">Content to speak is not available for this exercise. Please try another one or contact support.</p>
              )}
            </div>
            
            {/* Hướng dẫn */}
            <div className="text-gray-300 text-xs md:text-sm mt-5 space-y-1 px-1">
              <p>1. Tap "Start Recording" to record your voice.</p>
              <p>2. Read the sentence(s) above loudly and clearly.</p>
              <p>3. Press "Stop Recording" when you're done.</p>
            </div>

            {/* Chỉ báo đang ghi âm */}
            {isRecording && (
              <div className="flex justify-center my-5">
                <div className="w-10 h-10 border-4 border-t-4 border-gray-500 border-t-red-500 rounded-full animate-spin" />
              </div>
            )}

            {/* Nút Ghi âm */}
            <div className="flex justify-center mt-6">
                <button
                    type="button"
                    disabled={isSubmitting || !contentToSpeak} // Disable nếu đang submit hoặc không có content
                    className="focus:outline-none gap-2 items-center flex text-white bg-[#5f3dc4] hover:bg-[#5234a7] focus:ring-4 focus:ring-[#5f3dc4]/50 font-medium rounded-lg text-sm px-6 py-3 transition-colors disabled:opacity-60"
                    onClick={toggleRecording}
                >
                    <MicrophoneIcon className="w-5 h-5" />
                    {isRecording ? "Stop Recording" : "Start Recording"}
                </button>
            </div>


            {/* Audio đã ghi và nút Submit */}
            {audioBlob && !isRecording && (
              <div className="mt-6 pt-4 border-t border-gray-700/50">
                <p className="text-center text-gray-300 text-sm mb-3">Your recording:</p>
                <div className="flex flex-col items-center gap-4">
                  <audio controls className="w-full max-w-sm">
                    <source src={URL.createObjectURL(audioBlob)} type={audioBlob.type || "audio/webm"} />
                    Your browser does not support the audio element.
                  </audio>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="focus:outline-none gap-2 items-center flex text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-800/50 font-medium rounded-lg text-sm px-8 py-3 transition-colors disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Recording"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
         {!isLoadingContent && !exerciseDetail && !error && (
            <div className="text-center py-10 text-gray-400">Could not load exercise. It might not exist or there was an issue.</div>
        )}
      </div>
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
export default TakeChallengeExercise;