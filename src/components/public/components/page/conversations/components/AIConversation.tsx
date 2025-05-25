import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useToast } from "@/hooks/use-toast";

interface Step {
  id: string;
  text: string;
  speaker: "AI" | "You";
  audioUrl?: string;
  wordStates?: { word: string; correct: boolean }[];
}

interface WordState {
  word: string;
  correct: boolean;
}

interface AIConversationProps {
  onWordStatesUpdate?: (words: Step["wordStates"] | null) => void;
  onRestart?: () => void;
}

const AIConversation: React.FC<AIConversationProps> = ({ onWordStatesUpdate, onRestart }) => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scoreText, setScoreText] = useState<string | null>(null);
  const { toast: customToast } = useToast();

  const sharedAudioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentStep]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;
    audioChunksRef.current = [];

    recorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      setRecordedBlob(blob);
    };

    setIsRecording(true);
    recorder.start();
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const fetchDialogue = async () => {
    if (!recordedBlob) return;
    setIsGenerating(true);

    const formData = new FormData();
    formData.append("audio_file", new File([recordedBlob], "topic.webm"));

    try {
      const res = await fetch("http://127.0.0.1:8000/api/dialogue/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      const steps: Step[] = data.steps.map((s: any, idx: number) => ({
        id: `step_${idx}`,
        speaker: s.speaker,
        text: s.text,
        audioUrl: s.audio_url || undefined,
      }));

      setSteps(steps);
      setCurrentStep(0);
      setRecordedBlob(null);
      setScoreText(null);

      if (steps[0]?.speaker === "AI" && steps[0].audioUrl) {
        sharedAudioRef.current!.src = steps[0].audioUrl;
        sharedAudioRef.current!.play();
        setIsPlaying(true);
      }
    } catch (err) {
      toast.error("Failed to generate dialogue. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const calculateScore = () => {
    const allWords = steps
      .filter((s) => s.speaker === "You" && s.wordStates)
      .flatMap((s) => s.wordStates || []);

    const total = allWords.length;
    const correct = allWords.filter((w) => w.correct).length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;

    setScoreText(`🎯 Your Pronunciation Score: ${score}/100 (${correct}/${total} correct words)`);

    toast.success(`🎉 Dialogue completed! Score: ${score}/100`, {
      style: {
        background: "#1a1a2e",
        color: "#fff",
        border: "1px solid #4ade80",
      },
    });

    customToast({
      title: "🎉 Dialogue completed!",
      description: `Score: ${score}/100 (${correct}/${total} correct words)`,
    });
  };

  const handleUserSubmit = async () => {
    if (!recordedBlob || !steps[currentStep]) {
      console.warn("🚫 Missing recordedBlob or invalid step at handleUserSubmit");
      return;
    }

    const formData = new FormData();
    formData.append("audio_file", new File([recordedBlob], "reply.webm"));
    formData.append("expected_text", steps[currentStep].text);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/submit-reply/", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log("📨 Response from /submit-reply:", result);

      const updatedSteps = [...steps];
      updatedSteps[currentStep].wordStates = result.words || [];
      setSteps(updatedSteps);

      if (onWordStatesUpdate) {
        onWordStatesUpdate(result.words || []);
      }

      const next = currentStep + 1;
      if (next < steps.length) {
        setCurrentStep(next);
        const nextStep = steps[next];
        if (nextStep.speaker === "AI" && nextStep.audioUrl) {
          sharedAudioRef.current!.src = nextStep.audioUrl;
          sharedAudioRef.current!.play();
          setIsPlaying(true);
        }
      } else {
        calculateScore();
      }
    } catch (error) {
      console.error("❌ Error submitting user reply:", error);
    } finally {
      setRecordedBlob(null);
    }
  };

  const handleRestart = () => {
    setSteps([]);
    setCurrentStep(0);
    setRecordedBlob(null);
    setIsPlaying(false);
    setScoreText(null);
    if (onWordStatesUpdate) onWordStatesUpdate(null);
    if (onRestart) onRestart();
  };

  return (
    <div className="p-6 bg-[#1a1a2e] text-white rounded-lg max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">🎤 AI Conversation</h2>

      {steps.length > 0 && (
        <div className="space-y-2 max-h-[500px] overflow-y-auto mb-4 p-3 bg-gray-900 rounded-lg">
          {steps.slice(0, currentStep + 1).map((step) => (
            <div key={step.id}>
              <div
                className={`p-2 rounded bg-opacity-90 ${
                  step.speaker === "AI"
                    ? "bg-purple-700 text-left"
                    : "bg-blue-600 text-left ml-auto"
                } max-w-[70%]`}
              >
                <strong>{step.speaker}:</strong> {step.text}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      )}

      {isRecording && (
        <div className="text-center text-yellow-300 font-semibold mt-4 animate-pulse">
          🔴 Recording in progress...
        </div>
      )}

      {isGenerating && (
        <div className="text-center text-green-300 font-semibold mt-4 animate-pulse">
          ⚙️ Generating dialogue, please wait...
        </div>
      )}

      {steps.length === 0 ? (
        <>
          <p className="mb-4">🎙️ Speak a topic to generate a conversation</p>
          <div className="flex gap-2 mb-4">
            <Button onClick={startRecording} disabled={isGenerating}>🎤 Record Topic</Button>
            <Button onClick={stopRecording} disabled={isGenerating}>⏹ Stop</Button>
            <Button onClick={fetchDialogue} disabled={isGenerating}>⚡ Generate</Button>
          </div>
        </>
      ) : (
        <>
          {steps[currentStep]?.speaker === "You" && (
            <div className="flex gap-2 mb-4">
              <Button onClick={startRecording}>🎤 Record</Button>
              <Button onClick={stopRecording}>⏹ Stop</Button>
              <Button onClick={handleUserSubmit}>✅ Submit</Button>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <Button onClick={handleRestart} className="bg-blue-600 hover:bg-blue-700 text-white">
              🔁 New Topic
            </Button>
          </div>
        </>
      )}

      {scoreText && (
        <div className="mt-6 text-center text-green-400 text-lg font-semibold">
          {scoreText}
        </div>
      )}

      <audio
        ref={sharedAudioRef}
        onEnded={() => {
          setIsPlaying(false);
          const next = currentStep + 1;
          if (next < steps.length) {
            setCurrentStep(next);
            const nextStep = steps[next];
            if (nextStep.speaker === "AI" && nextStep.audioUrl) {
              sharedAudioRef.current!.src = nextStep.audioUrl;
              sharedAudioRef.current!.play();
              setIsPlaying(true);
            }
          } else {
            calculateScore();
          }
        }}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default AIConversation;
