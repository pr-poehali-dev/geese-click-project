import React, { useState, useEffect } from "react";
import GameHeader from "@/components/GameHeader";
import HouseView from "@/components/HouseView";
import ChatSystem from "@/components/ChatSystem";
import AngerMeter from "@/components/AngerMeter";
import GameOverScreen from "@/components/GameOverScreen";

export interface GooseState {
  hunger: number; // 0-100
  happiness: number; // 0-100
  anger: number; // 0-100
  mood: "happy" | "neutral" | "angry" | "hungry";
}

const Index = () => {
  const [money, setMoney] = useState(100);
  const [timeOfDay, setTimeOfDay] = useState("утро");
  const [gooseState, setGooseState] = useState<GooseState>({
    hunger: 50,
    happiness: 70,
    anger: 0,
    mood: "neutral",
  });
  const [isChatOpen, setChatOpen] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<
    "living" | "kitchen" | "computer"
  >("living");

  // Update goose mood based on stats
  useEffect(() => {
    let newMood: GooseState["mood"] = "neutral";

    if (gooseState.anger > 70) newMood = "angry";
    else if (gooseState.hunger > 80) newMood = "hungry";
    else if (gooseState.happiness > 70) newMood = "happy";

    setGooseState((prev) => ({ ...prev, mood: newMood }));
  }, [gooseState.hunger, gooseState.happiness, gooseState.anger]);

  // Game over when anger reaches 100
  useEffect(() => {
    if (gooseState.anger >= 100) {
      setGameOver(true);
    }
  }, [gooseState.anger]);

  // Time progression
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay((prev) => {
        const times = ["утро", "день", "вечер", "ночь"];
        const currentIndex = times.indexOf(prev);
        return times[(currentIndex + 1) % times.length];
      });

      // Gradual hunger increase
      setGooseState((prev) => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + 2),
        happiness: Math.max(0, prev.happiness - 1),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Chat toggle with T key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "t" && !isGameOver) {
        setChatOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isGameOver]);

  const feedGoose = (food: string) => {
    if (food === "carrot") {
      setGooseState((prev) => ({
        ...prev,
        hunger: Math.max(0, prev.hunger - 30),
        happiness: Math.min(100, prev.happiness + 20),
        anger: Math.max(0, prev.anger - 10),
      }));
    } else {
      setGooseState((prev) => ({
        ...prev,
        hunger: Math.max(0, prev.hunger - 15),
        happiness: Math.min(100, prev.happiness + 5),
      }));
    }
  };

  const handleChatResponse = (responseType: "kind" | "mean" | "neutral") => {
    if (responseType === "mean") {
      setGooseState((prev) => ({
        ...prev,
        anger: Math.min(100, prev.anger + 15),
        happiness: Math.max(0, prev.happiness - 10),
      }));
    } else if (responseType === "kind") {
      setGooseState((prev) => ({
        ...prev,
        anger: Math.max(0, prev.anger - 5),
        happiness: Math.min(100, prev.happiness + 10),
      }));
    }
  };

  const resetGame = () => {
    setMoney(100);
    setTimeOfDay("утро");
    setGooseState({
      hunger: 50,
      happiness: 70,
      anger: 0,
      mood: "neutral",
    });
    setGameOver(false);
    setChatOpen(false);
    setCurrentRoom("living");
  };

  if (isGameOver) {
    return <GameOverScreen onRestart={resetGame} />;
  }

  return (
    <div className="min-h-screen flex flex-col house-bg relative overflow-hidden">
      <GameHeader money={money} timeOfDay={timeOfDay} gooseState={gooseState} />

      <HouseView
        currentRoom={currentRoom}
        onRoomChange={setCurrentRoom}
        gooseState={gooseState}
        onFeedGoose={feedGoose}
        money={money}
        onMoneyChange={setMoney}
      />

      <ChatSystem
        isOpen={isChatOpen}
        onClose={() => setChatOpen(false)}
        gooseState={gooseState}
        onResponse={handleChatResponse}
      />

      <AngerMeter anger={gooseState.anger} />

      {/* Instructions */}
      <div className="absolute top-20 left-4 bg-black/50 p-2 rounded text-white text-sm">
        <div>Нажмите T для чата</div>
        <div>Клик - взаимодействие</div>
      </div>
    </div>
  );
};

export default Index;
