import React, { useState, useEffect } from "react";
import { GooseState } from "@/pages/Index";

interface GooseCharacterProps {
  gooseState: GooseState;
}

const GooseCharacter: React.FC<GooseCharacterProps> = ({ gooseState }) => {
  const [currentAnimation, setCurrentAnimation] = useState<
    "idle" | "happy" | "angry" | "eating"
  >("idle");
  const [speechBubble, setSpeechBubble] = useState<string>("");

  const getGooseEmoji = () => {
    switch (gooseState.mood) {
      case "happy":
        return "🦢";
      case "angry":
        return "🦆";
      case "hungry":
        return "🦆";
      default:
        return "🦢";
    }
  };

  const getRandomMessage = () => {
    const messages = {
      happy: [
        "Га-га! Спасибо за морковку! 🥕",
        "Я такой счастливый гусь! 😊",
        "Ты лучший хозяин! Га-га-га!",
        "Морковка моя любимая еда! 💕",
      ],
      angry: [
        "ГА-ГА-ГА! Я злой! 😠",
        "Где моя морковка?! ГА!",
        "Ты плохой хозяин! ГА-ГА!",
        "Я тебя съем если не покормишь! 👹",
      ],
      hungry: [
        "Га-га... Я голодный... 🤤",
        "Можно морковку? Пожалуйста? 🥕",
        "У меня урчит в животе... га...",
        "Покорми меня, хозяин!",
      ],
      neutral: [
        "Га-га! Привет, хозяин!",
        "Что будем делать? Га!",
        "Я просто гусь... га-га...",
        "Хочешь поговорить? 💬",
      ],
    };

    const moodMessages = messages[gooseState.mood];
    return moodMessages[Math.floor(Math.random() * moodMessages.length)];
  };

  // Random speech bubbles
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        // 30% chance
        setSpeechBubble(getRandomMessage());
        setTimeout(() => setSpeechBubble(""), 3000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [gooseState.mood]);

  // Animation based on mood
  useEffect(() => {
    setCurrentAnimation(
      gooseState.mood === "happy"
        ? "happy"
        : gooseState.mood === "angry"
          ? "angry"
          : "idle",
    );
  }, [gooseState.mood]);

  const getAnimationClass = () => {
    switch (currentAnimation) {
      case "happy":
        return "animate-bounce";
      case "angry":
        return "animate-pulse";
      case "eating":
        return "animate-ping";
      default:
        return "";
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Speech bubble */}
      {speechBubble && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white/90 p-2 rounded-lg border-2 border-gray-300 max-w-xs text-center text-sm text-black z-10">
          {speechBubble}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white/90"></div>
        </div>
      )}

      {/* Goose character */}
      <div
        className={`text-8xl cursor-pointer hover:scale-110 transition-all duration-300 ${getAnimationClass()}`}
        onClick={() => {
          setSpeechBubble(getRandomMessage());
          setTimeout(() => setSpeechBubble(""), 2000);
        }}
      >
        {getGooseEmoji()}
      </div>

      {/* Status indicators */}
      <div className="flex space-x-2 mt-2">
        {gooseState.hunger > 70 && <span className="text-red-400">🍽️</span>}
        {gooseState.happiness > 80 && (
          <span className="text-yellow-400">✨</span>
        )}
        {gooseState.anger > 50 && <span className="text-red-600">💢</span>}
      </div>

      {/* Name tag */}
      <div className="pixel-font text-white text-lg mt-2 bg-black/50 px-2 py-1 rounded">
        Гусь Гоша
      </div>
    </div>
  );
};

export default GooseCharacter;
