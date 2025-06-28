import React from "react";

interface GameMenuProps {
  onStartGame: () => void;
  highScore: number;
  isGameActive: boolean;
  gameEnded: boolean;
  finalScore: number;
}

const GameMenu: React.FC<GameMenuProps> = ({
  onStartGame,
  highScore,
  isGameActive,
  gameEnded,
  finalScore,
}) => {
  if (isGameActive) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
      <div className="text-center max-w-md mx-auto p-8">
        {!gameEnded ? (
          <>
            <div className="pixel-font text-6xl mb-6 retro-glow">
              🦢 ГУСИ 🦢
            </div>
            <div className="pixel-font text-3xl text-purple-300 mb-8">
              РЕТРО КЛИКЕР
            </div>

            <div className="mb-8 space-y-4">
              <div className="text-white/80 pixel-font text-lg">
                Кликайте по гусям и набирайте очки!
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/10 p-3 rounded border-2 border-gray-400">
                  <div className="text-2xl mb-1">🦢🦆</div>
                  <div className="text-white/70">10-15 очков</div>
                </div>
                <div className="bg-orange-500/20 p-3 rounded border-2 border-orange-400">
                  <div className="text-2xl mb-1">🦤🕊️</div>
                  <div className="text-orange-300">50-75 очков</div>
                </div>
                <div className="bg-cyan-500/20 p-3 rounded border-2 border-cyan-400">
                  <div className="text-2xl mb-1">🦅🦉</div>
                  <div className="text-cyan-300">150-200 очков</div>
                </div>
                <div className="bg-purple-500/20 p-3 rounded border-2 border-purple-400">
                  <div className="text-2xl mb-1">🦚</div>
                  <div className="text-purple-300">500 очков</div>
                </div>
              </div>
            </div>

            {highScore > 0 && (
              <div className="mb-6 p-4 bg-cyan-500/20 rounded border-2 border-cyan-400">
                <div className="pixel-font text-xl text-cyan-300">
                  ЛУЧШИЙ РЕЗУЛЬТАТ
                </div>
                <div className="pixel-font text-3xl text-white rare-glow">
                  {highScore.toLocaleString()}
                </div>
              </div>
            )}

            <button
              onClick={onStartGame}
              className="pixel-font text-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-12 py-4 rounded-lg border-4 border-purple-400 retro-glow hover:scale-105 transition-all duration-200"
            >
              НАЧАТЬ ИГРУ
            </button>
          </>
        ) : (
          <>
            <div className="pixel-font text-5xl mb-6">🎮 ИГРА ОКОНЧЕНА</div>

            <div className="mb-6 space-y-4">
              <div className="p-4 bg-white/10 rounded border-2 border-gray-400">
                <div className="pixel-font text-xl text-gray-300">
                  ВАШ РЕЗУЛЬТАТ
                </div>
                <div className="pixel-font text-4xl text-white">
                  {finalScore.toLocaleString()}
                </div>
              </div>

              {finalScore >= highScore && finalScore > 0 && (
                <div className="p-4 bg-purple-500/20 rounded border-2 border-purple-400 retro-glow">
                  <div className="pixel-font text-xl text-purple-300">
                    🏆 НОВЫЙ РЕКОРД! 🏆
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onStartGame}
              className="pixel-font text-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-12 py-4 rounded-lg border-4 border-purple-400 retro-glow hover:scale-105 transition-all duration-200"
            >
              ИГРАТЬ СНОВА
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GameMenu;
