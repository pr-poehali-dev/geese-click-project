import React, { useEffect, useState } from "react";

interface ScorePopupProps {
  score: number;
  position: { x: number; y: number };
  special?: string;
  onComplete: () => void;
}

const ScorePopup: React.FC<ScorePopupProps> = ({
  score,
  position,
  special,
  onComplete,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  const getColor = () => {
    if (special) return "text-purple-400";
    if (score >= 100) return "text-orange-400";
    if (score >= 50) return "text-cyan-400";
    return "text-green-400";
  };

  return (
    <div
      className={`absolute pointer-events-none score-popup pixel-font text-2xl font-bold ${getColor()}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
        textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
      }}
    >
      +{score}
      {special && <div className="text-sm">{special}</div>}
    </div>
  );
};

export default ScorePopup;
