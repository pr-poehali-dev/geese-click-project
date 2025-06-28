import React from "react";

interface GameHeaderProps {
  score: number;
  timeLeft: number;
  combo: number;
  highScore: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  score,
  timeLeft,
  combo,
  highScore,
}) => {
  return (
    <div className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b-2 border-purple-500">
      <div className="flex space-x-8">
        <div className="text-center">
          <div className="pixel-font text-2xl text-purple-300">СЧЁТ</div>
          <div className="pixel-font text-4xl text-white retro-glow">
            {score.toLocaleString()}
          </div>
        </div>

        <div className="text-center">
          <div className="pixel-font text-2xl text-orange-300">КОМБО</div>
          <div
            className={`pixel-font text-4xl ${combo > 5 ? "text-orange-400 golden-glow" : "text-white"}`}
          >
            {combo}x
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="pixel-font text-2xl text-green-300">ВРЕМЯ</div>
        <div
          className={`pixel-font text-4xl ${timeLeft <= 10 ? "text-red-400 animate-pulse" : "text-white"}`}
        >
          {timeLeft}с
        </div>
      </div>

      <div className="text-center">
        <div className="pixel-font text-2xl text-cyan-300">РЕКОРД</div>
        <div className="pixel-font text-4xl text-cyan-400 rare-glow">
          {highScore.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
