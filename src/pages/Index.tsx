import React, { useState, useEffect } from "react";
import GameHeader from "@/components/GameHeader";
import GameArea from "@/components/GameArea";
import GameMenu from "@/components/GameMenu";

const GAME_DURATION = 30; // seconds

const Index = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("goose-game-high-score");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [combo, setCombo] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isGameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsGameActive(false);
            setGameEnded(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isGameActive, timeLeft]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("goose-game-high-score", score.toString());
    }
  }, [score, highScore]);

  const handleScoreUpdate = (points: number) => {
    setScore((prev) => prev + points);
  };

  const handleComboUpdate = (newCombo: number) => {
    setCombo(newCombo);
  };

  const startGame = () => {
    setScore(0);
    setCombo(0);
    setTimeLeft(GAME_DURATION);
    setIsGameActive(true);
    setGameEnded(false);
  };

  return (
    <div className="min-h-screen flex flex-col game-bg relative overflow-hidden">
      <GameHeader
        score={score}
        timeLeft={timeLeft}
        combo={combo}
        highScore={highScore}
      />

      <GameArea
        onScoreUpdate={handleScoreUpdate}
        onComboUpdate={handleComboUpdate}
        isGameActive={isGameActive}
      />

      <GameMenu
        onStartGame={startGame}
        highScore={highScore}
        isGameActive={isGameActive}
        gameEnded={gameEnded}
        finalScore={score}
      />

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 left-20 text-6xl animate-pulse">🌟</div>
        <div
          className="absolute top-32 right-32 text-4xl animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          ✨
        </div>
        <div
          className="absolute bottom-20 left-32 text-5xl animate-pulse"
          style={{ animationDelay: "2s" }}
        >
          💫
        </div>
        <div
          className="absolute bottom-32 right-20 text-3xl animate-bounce"
          style={{ animationDelay: "3s" }}
        >
          ⭐
        </div>
      </div>
    </div>
  );
};

export default Index;
