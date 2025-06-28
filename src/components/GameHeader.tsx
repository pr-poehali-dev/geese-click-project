import React from "react";
import { GooseState } from "@/pages/Index";

interface GameHeaderProps {
  money: number;
  timeOfDay: string;
  gooseState: GooseState;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  money,
  timeOfDay,
  gooseState,
}) => {
  const getTimeEmoji = () => {
    switch (timeOfDay) {
      case "утро":
        return "🌅";
      case "день":
        return "☀️";
      case "вечер":
        return "🌆";
      case "ночь":
        return "🌙";
      default:
        return "🕐";
    }
  };

  const getStatusColor = (value: number, reverse = false) => {
    if (reverse) {
      if (value > 70) return "text-red-400";
      if (value > 40) return "text-orange-400";
      return "text-green-400";
    } else {
      if (value > 70) return "text-green-400";
      if (value > 40) return "text-orange-400";
      return "text-red-400";
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-amber-900/50 to-orange-900/50 border-b-2 border-amber-600">
      <div className="flex space-x-6">
        <div className="text-center">
          <div className="pixel-font text-lg text-amber-300">ДЕНЬГИ</div>
          <div className="pixel-font text-2xl text-white golden-glow">
            💰 {money}₽
          </div>
        </div>

        <div className="text-center">
          <div className="pixel-font text-lg text-blue-300">ВРЕМЯ</div>
          <div className="pixel-font text-2xl text-white">
            {getTimeEmoji()} {timeOfDay}
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="text-center">
          <div className="pixel-font text-sm text-pink-300">ГОЛОД</div>
          <div
            className={`pixel-font text-xl ${getStatusColor(gooseState.hunger, true)}`}
          >
            🍽️ {Math.round(gooseState.hunger)}%
          </div>
        </div>

        <div className="text-center">
          <div className="pixel-font text-sm text-green-300">СЧАСТЬЕ</div>
          <div
            className={`pixel-font text-xl ${getStatusColor(gooseState.happiness)}`}
          >
            😊 {Math.round(gooseState.happiness)}%
          </div>
        </div>

        <div className="text-center">
          <div className="pixel-font text-sm text-purple-300">НАСТРОЕНИЕ</div>
          <div className="pixel-font text-xl text-white">
            {gooseState.mood === "happy" && "😊"}
            {gooseState.mood === "neutral" && "😐"}
            {gooseState.mood === "angry" && "😠"}
            {gooseState.mood === "hungry" && "🤤"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
