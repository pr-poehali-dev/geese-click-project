import React from "react";

interface GameOverScreenProps {
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ onRestart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-900 to-black relative overflow-hidden">
      <div className="text-center max-w-md mx-auto p-8 bg-black/50 rounded-lg border-2 border-red-500">
        <div className="text-6xl mb-4 animate-bounce">🦆</div>
        <div className="pixel-font text-4xl text-red-400 mb-4 animate-pulse">
          ИГРА ОКОНЧЕНА
        </div>

        <div className="text-xl text-red-300 mb-6 pixel-font">
          Гусь Гоша съел вас! 😱
        </div>

        <div className="text-white/70 mb-8 text-sm">
          Вы слишком разозлили гуся своими ответами в чате.
          <br />
          Будьте добрее к животным! 🥺
        </div>

        <button
          onClick={onRestart}
          className="pixel-font text-xl bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white px-8 py-3 rounded-lg border-2 border-green-400 hover:scale-105 transition-all duration-200"
        >
          🔄 НАЧАТЬ ЗАНОВО
        </button>

        <div className="mt-4 text-xs text-gray-400">
          Совет: отвечайте добрее и кормите гуся морковкой! 🥕
        </div>
      </div>

      {/* Scary background effects */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 left-20 text-4xl animate-pulse text-red-500">
          💀
        </div>
        <div className="absolute top-32 right-32 text-3xl animate-bounce text-red-400">
          👻
        </div>
        <div className="absolute bottom-20 left-32 text-5xl animate-pulse text-red-600">
          🔥
        </div>
        <div className="absolute bottom-32 right-20 text-2xl animate-bounce text-red-300">
          ⚡
        </div>
      </div>
    </div>
  );
};

export default GameOverScreen;
