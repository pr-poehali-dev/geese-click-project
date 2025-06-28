import React from "react";

export interface GooseType {
  id: string;
  emoji: string;
  points: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  special?: "double" | "triple" | "bomb" | "time";
  size: number;
}

interface GooseProps {
  goose: GooseType;
  position: { x: number; y: number };
  onClick: (goose: GooseType) => void;
  isClicked: boolean;
}

const Goose: React.FC<GooseProps> = ({
  goose,
  position,
  onClick,
  isClicked,
}) => {
  const getGlowClass = () => {
    switch (goose.rarity) {
      case "rare":
        return "golden-glow";
      case "epic":
        return "rare-glow";
      case "legendary":
        return "retro-glow";
      default:
        return "";
    }
  };

  const getRarityBorder = () => {
    switch (goose.rarity) {
      case "rare":
        return "border-4 border-orange-400";
      case "epic":
        return "border-4 border-cyan-400";
      case "legendary":
        return "border-4 border-purple-400";
      default:
        return "border-2 border-gray-400";
    }
  };

  return (
    <div
      className={`absolute cursor-pointer select-none transition-all duration-200 hover:scale-110 ${
        isClicked ? "goose-click" : ""
      } ${getGlowClass()} ${getRarityBorder()} rounded-full p-2 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-sm`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        fontSize: `${goose.size}px`,
        transform: "translate(-50%, -50%)",
      }}
      onClick={() => onClick(goose)}
    >
      <div className="relative">
        {goose.emoji}
        {goose.special && (
          <div className="absolute -top-1 -right-1 text-xs">
            {goose.special === "double" && "2️⃣"}
            {goose.special === "triple" && "3️⃣"}
            {goose.special === "bomb" && "💥"}
            {goose.special === "time" && "⏰"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Goose;
