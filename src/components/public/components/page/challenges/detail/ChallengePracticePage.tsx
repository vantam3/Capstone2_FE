import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MicrophoneIcon } from "@heroicons/react/24/outline";

function ChallengePracticePage() {
  const { challengeId, exerciseId } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<any>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await axios.get(`http://localhost:8000/api/challenges/exercises/${exerciseId}/detail/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setExercise(res.data);
    };
    fetchDetail();
  }, [exerciseId]);

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    recorder.ondataavailable = e => audioChunksRef.current.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      setAudioBlob(blob);
      audioChunksRef.current = [];
      stream.getTracks().forEach(track => track.stop());
    };
    audioChunksRef.current = [];
    recorder.start();
    setIsRecording(true);
  };

  const handleSubmit = async () => {
    if (!audioBlob) return;
    const formData = new FormData();
    formData.append("audio_file", new File([audioBlob], "exercise.webm"));
    const res = await axios.post(`http://localhost:8000/api/challenges/exercises/${exerciseId}/submit_attempt/`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    navigate(`/challenges/${challengeId}/result/${res.data.score}`);
  };

  if (!exercise) return <div className="mt-24 text-center text-white">Loading...</div>;

  return (
    <div className="mt-24 max-w-3xl mx-auto p-6 text-white">
      <h3 className="text-xl font-bold">Practice: {exercise.title}</h3>
      <p className="text-sm text-gray-400 mt-2">{exercise.description}</p>

      <div className="w-full mt-8 p-4 bg-[#230e58] border border-[#2d1674] rounded-lg">
        <h5 className="mb-2 text-lg font-semibold">Read the sentence below:</h5>
        <p className="text-white text-lg font-semibold bg-[#2d1674] border rounded p-3">
          "{exercise.speaking_text_content}"
        </p>
        <div className="mt-5 text-sm text-gray-300">
          <p>1. Click Start to begin recording.</p>
          <p>2. Read the sentence above.</p>
          <p>3. Click Stop when done and then Submit.</p>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={toggleRecording}
            className="flex items-center gap-2 bg-[#5f3dc4] px-6 py-3 rounded text-white"
          >
            <MicrophoneIcon className="w-5 h-5" />
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
        </div>
        {audioBlob && (
          <div className="mt-6 text-center">
            <audio controls className="w-full">
              <source src={URL.createObjectURL(audioBlob)} />
            </audio>
            <button
              onClick={handleSubmit}
              className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              Submit Recording
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChallengePracticePage;