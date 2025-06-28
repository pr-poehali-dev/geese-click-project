import React from "react";

interface AngerMeterProps {
  anger: number; // 0-100
}

const AngerMeter: React.FC<AngerMeterProps> = ({ anger }) => {
  const getAngerColor = () => {
    if (anger > 80) return "bg-red-600";
    if (anger > 60) return "bg-orange-500";
    if (anger > 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getAngerEmoji = () => {
    if (anger > 80) return "🔥";
    if (anger > 60) return "😡";
    if (anger > 40) return "😠";
    if (anger > 20) return "😤";
    return "😊";
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black/70 p-3 rounded-lg border-2 border-red-400 min-w-[150px]">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-lg">{getAngerEmoji()}</span>
        <span className="pixel-font text-white text-sm">ЗЛОСТЬ</span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${getAngerColor()} ${
            anger > 90 ? "animate-pulse" : ""
          }`}
          style={{ width: `${anger}%` }}
        ></div>
      </div>

      <div className="text-center text-white text-xs mt-1 pixel-font">
        {Math.round(anger)}%
      </div>

      {anger > 90 && (
        <div className="text-center text-red-400 text-xs mt-1 animate-pulse pixel-font">
          ⚠️ ОПАСНО!
        </div>
      )}
    </div>
  );
};

export default AngerMeter;
