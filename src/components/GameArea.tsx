import React, { useState, useEffect, useCallback } from "react";
import Goose, { GooseType } from "./Goose";
import ScorePopup from "./ScorePopup";

interface GameAreaProps {
  onScoreUpdate: (points: number) => void;
  onComboUpdate: (combo: number) => void;
  isGameActive: boolean;
}

interface PopupData {
  id: string;
  score: number;
  position: { x: number; y: number };
  special?: string;
}

const GOOSE_TYPES: GooseType[] = [
  { id: "common1", emoji: "🦢", points: 10, rarity: "common", size: 48 },
  { id: "common2", emoji: "🦆", points: 15, rarity: "common", size: 48 },
  {
    id: "rare1",
    emoji: "🦤",
    points: 50,
    rarity: "rare",
    size: 56,
    special: "double",
  },
  { id: "rare2", emoji: "🕊️", points: 75, rarity: "rare", size: 56 },
  {
    id: "epic1",
    emoji: "🦅",
    points: 150,
    rarity: "epic",
    size: 64,
    special: "triple",
  },
  {
    id: "epic2",
    emoji: "🦉",
    points: 200,
    rarity: "epic",
    size: 64,
    special: "time",
  },
  {
    id: "legendary",
    emoji: "🦚",
    points: 500,
    rarity: "legendary",
    size: 72,
    special: "bomb",
  },
];

const GameArea: React.FC<GameAreaProps> = ({
  onScoreUpdate,
  onComboUpdate,
  isGameActive,
}) => {
  const [geese, setGeese] = useState<
    Array<GooseType & { position: { x: number; y: number }; id: string }>
  >([]);
  const [clickedGeese, setClickedGeese] = useState<Set<string>>(new Set());
  const [popups, setPopups] = useState<PopupData[]>([]);
  const [combo, setCombo] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const spawnGoose = useCallback(() => {
    if (!isGameActive) return;

    const rarityRoll = Math.random();
    let selectedType: GooseType;

    if (rarityRoll < 0.5) {
      selectedType = GOOSE_TYPES.filter((g) => g.rarity === "common")[
        Math.floor(Math.random() * 2)
      ];
    } else if (rarityRoll < 0.8) {
      selectedType = GOOSE_TYPES.filter((g) => g.rarity === "rare")[
        Math.floor(Math.random() * 2)
      ];
    } else if (rarityRoll < 0.95) {
      selectedType = GOOSE_TYPES.filter((g) => g.rarity === "epic")[
        Math.floor(Math.random() * 2)
      ];
    } else {
      selectedType = GOOSE_TYPES[6]; // legendary
    }

    const newGoose = {
      ...selectedType,
      id: `${selectedType.id}-${Date.now()}-${Math.random()}`,
      position: {
        x: Math.random() * (window.innerWidth - 200) + 100,
        y: Math.random() * 400 + 200,
      },
    };

    setGeese((prev) => [...prev, newGoose]);

    // Remove goose after 3-5 seconds
    setTimeout(
      () => {
        setGeese((prev) => prev.filter((g) => g.id !== newGoose.id));
      },
      3000 + Math.random() * 2000,
    );
  }, [isGameActive]);

  useEffect(() => {
    if (!isGameActive) return;

    const interval = setInterval(spawnGoose, 800 + Math.random() * 1200);
    return () => clearInterval(interval);
  }, [spawnGoose, isGameActive]);

  const handleGooseClick = (
    goose: GooseType & { position: { x: number; y: number }; id: string },
  ) => {
    if (clickedGeese.has(goose.id)) return;

    const now = Date.now();
    let newCombo = combo;

    if (now - lastClickTime < 2000) {
      newCombo = combo + 1;
    } else {
      newCombo = 1;
    }

    setCombo(newCombo);
    setLastClickTime(now);
    onComboUpdate(newCombo);

    let finalPoints = goose.points;
    let specialText = "";

    // Apply combo multiplier
    if (newCombo > 1) {
      finalPoints *= Math.min(newCombo, 10);
    }

    // Apply special effects
    if (goose.special === "double") {
      finalPoints *= 2;
      specialText = "ДВОЙНОЙ!";
    } else if (goose.special === "triple") {
      finalPoints *= 3;
      specialText = "ТРОЙНОЙ!";
    } else if (goose.special === "bomb") {
      finalPoints *= 5;
      specialText = "ВЗРЫВ!";
      // Remove nearby geese
      setGeese((prev) =>
        prev.filter((g) => {
          const distance = Math.sqrt(
            Math.pow(g.position.x - goose.position.x, 2) +
              Math.pow(g.position.y - goose.position.y, 2),
          );
          return distance > 100 || g.id === goose.id;
        }),
      );
    }

    onScoreUpdate(finalPoints);

    // Add score popup
    const popup: PopupData = {
      id: `popup-${Date.now()}`,
      score: finalPoints,
      position: goose.position,
      special: specialText,
    };
    setPopups((prev) => [...prev, popup]);

    // Mark goose as clicked and remove it
    setClickedGeese((prev) => new Set([...prev, goose.id]));
    setTimeout(() => {
      setGeese((prev) => prev.filter((g) => g.id !== goose.id));
      setClickedGeese((prev) => {
        const newSet = new Set(prev);
        newSet.delete(goose.id);
        return newSet;
      });
    }, 300);
  };

  const removePopup = (popupId: string) => {
    setPopups((prev) => prev.filter((p) => p.id !== popupId));
  };

  return (
    <div className="relative flex-1 game-bg overflow-hidden">
      {geese.map((goose) => (
        <Goose
          key={goose.id}
          goose={goose}
          position={goose.position}
          onClick={handleGooseClick}
          isClicked={clickedGeese.has(goose.id)}
        />
      ))}

      {popups.map((popup) => (
        <ScorePopup
          key={popup.id}
          score={popup.score}
          position={popup.position}
          special={popup.special}
          onComplete={() => removePopup(popup.id)}
        />
      ))}

      {!isGameActive && geese.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white/50">
            <div className="pixel-font text-6xl mb-4">🦢</div>
            <div className="pixel-font text-2xl">
              Кликайте по гусям для получения очков!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameArea;
