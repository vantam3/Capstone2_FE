import { useState, useEffect } from "react";
import { MicrophoneIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TakeTest({ selectedLevel, selectedTopic, setActiveTab, setResultData }) {
  const [question, setQuestion] = useState(null);
  const [progress, setProgress] = useState(10);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [audioElement, setAudioElement] = useState(null);
  const [isControlVisible, setIsControlVisible] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecordingIndicatorVisible, setIsRecordingIndicatorVisible] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);  // NEW

  const GENRE_MAP = {
    1: "Daily Life",
    2: "Technology",
    3: "Travel",
    4: "Education",
    5: "Family",
    6: "Others"
  };

  const LEVEL_MAP = {
    1: "Beginner",
    2: "Intermediate",
    3: "Advanced"
  };

  useEffect(() => {
    const selectedTextId = sessionStorage.getItem("selectedTextId");
    if (!selectedTextId) return;

    axios.get(`http://127.0.0.1:8000/speaking-texts/${selectedTextId}/`)
      .then((res) => {
        const data = res.data;
        setQuestion({
          id: data.id,
          title: data.title,
          content: data.content,
        });

        axios.get(`http://127.0.0.1:8000/audios/${data.id}/`)
          .then((audioResponse) => {
            const audio = audioResponse.data.audio_url;
            if (audio) setAudioUrl(audio);
          });

        setProgress(100);
      })
      .catch(() => {
        setError("Failed to load question.");
      });
  }, []);

  useEffect(() => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const newRecorder = new MediaRecorder(stream);
          newRecorder.ondataavailable = (e) => setAudioBlob(e.data);
          setRecorder(newRecorder);
        })
        .catch(() => {
          setError("Unable to access your microphone");
        });
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recorder.stop();
    } else {
      recorder.start();
    }
    setIsRecording(!isRecording);
    setIsRecordingIndicatorVisible(!isRecordingIndicatorVisible);
  };

  const handlePlayAudio = () => {
    if (!audioElement) {
      const newAudio = new Audio(audioUrl);
      setAudioElement(newAudio);
    }
    setIsControlVisible(true);
  };

  const handlePlayRecording = () => {
    if (audioBlob) {
      const player = new Audio(URL.createObjectURL(audioBlob));
      setAudioPlayer(player);
      player.play();
    }
  };

  const handleSubmit = () => {
    if (!audioBlob) {
      setError("No recording available to submit.");
      return;
    }

    if (!question?.id) {
      setError("No question selected.");
      return;
    }

    // Lấy token từ sessionStorage
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to submit.");
      return;
    }

    setIsSubmitting(true);  // Bật loading và disable nút
    setError("");           // Xóa lỗi cũ

    const webmFile = new File([audioBlob], "user_audio.webm", { type: "audio/webm" });
    const formData = new FormData();
    formData.append("audio_file", webmFile);
    formData.append("speaking_text_id", question.id);

    toast.info("Submitting your recording, please wait...");

    axios
      .post("http://127.0.0.1:8000/api/submit-speaking/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      })
      .then((res) => {
        setIsSubmitting(false);
        toast.success("Submitted successfully!");
        setResultData({
          score: res.data.score,
          user_text: res.data.user_text,
          original_text: res.data.original_text,
          examTime: new Date().toLocaleString(),
          topicName: selectedTopic,
          levelName: selectedLevel,
        });
        setActiveTab("tab_3");
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.error("Upload failed:", err);
        const message = err.response?.data?.error || "An error occurred while submitting the audio.";
        setError(message);
        toast.error(message);
      });
  };

  return (
    <>
      <div className="mt-8">
        <h3>Practice Pronunciation</h3>
        <h3 className="text-gray-400 mt-2">Topic: {GENRE_MAP[selectedTopic] || selectedTopic}</h3>
        <h3 className="text-gray-400 mt-2">Level: {LEVEL_MAP[selectedLevel] || selectedLevel}</h3>
        <div className="flex items-center mt-2">
          <h3 className="text-gray-400">Progress</h3>
          <h3 className="text-gray-400 ml-auto">1/1 question</h3>
        </div>
        <div className="w-full bg-[#4b2f8d] rounded-full h-2">
          <div className="bg-[#8861ea] h-2 rounded-full" style={{ width: `${progress}%` }} />
        </div>

        {error ? (
          <div className="text-red-500 mt-4"><p>{error}</p></div>
        ) : (
          <div className="w-full mt-8 p-4 bg-[#1a0940] border border-[#2d1674] rounded-[10px] shadow-sm sm:p-6">
            <h5 className="mb-2 text-sm text-gray-400">Title:</h5>
            <p className="mb-5 text-white text-lg font-semibold">{question ? question.title : "Loading..."}</p>
            <div className="w-full mt-8 p-4 bg-[#230e58] border border-[#2d1674] rounded-[10px] shadow-sm sm:p-6">
              <h5 className="mb-2 text-lg text-white font-semibold">Practice pronunciation with the following sentence:</h5>
              <div className="mb-5 text-white text-lg font-semibold bg-[#2d1674] border border-[#2d1674] rounded-[10px] sm:p-2 whitespace-pre-line">
                {question ? question.content : "Loading..."}
              </div>

              <button
                onClick={handlePlayAudio}
                className="focus:outline-none gap-2 items-center flex m-auto text-white bg-[#5f3dc4] hover:bg-[#5f3dc4] font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Listen to Example
              </button>

              {isControlVisible && audioElement && (
                <audio id="audio-player" controls>
                  <source src={audioUrl} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              )}

              <p className="text-gray-300 text-sm mt-4">1. Tap "Start Recording" to record your voice</p>
              <p className="text-gray-300 text-sm">2. Read the above sentence loudly and clearly.</p>
              <p className="text-gray-300 text-sm">3. Press "Stop Recording" when you're done reading</p>

              {isRecordingIndicatorVisible && (
                <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-t-[#ff0000] rounded-full animate-spin mx-auto mb-4" />
              )}

              <button
                type="button"
                className="focus:outline-none gap-2 items-center flex m-auto text-white bg-[#5f3dc4] hover:bg-[#5f3dc4] font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={toggleRecording}
              >
                <MicrophoneIcon className="w-4 h-4" />
                {isRecording ? "Stop Recording" : "Start Recording"}
              </button>

              {audioBlob && (
                <div className="flex flex-col items-center mt-4">
                  <audio controls>
                    <source src={URL.createObjectURL(audioBlob)} type="audio/webm" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting} // disable khi đang gửi
                className="focus:outline-none gap-2 items-center flex m-auto text-white bg-[#5f3dc4] hover:bg-[#5f3dc4] font-medium rounded-lg text-sm px-5 py-2.5 mt-4 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
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
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default TakeTest;
