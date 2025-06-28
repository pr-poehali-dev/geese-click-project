import React from "react";
import { GooseState } from "@/pages/Index";
import GooseCharacter from "./GooseCharacter";
import Icon from "@/components/ui/icon";

interface HouseViewProps {
  currentRoom: "living" | "kitchen" | "computer";
  onRoomChange: (room: "living" | "kitchen" | "computer") => void;
  gooseState: GooseState;
  onFeedGoose: (food: string) => void;
  money: number;
  onMoneyChange: (money: number) => void;
}

const HouseView: React.FC<HouseViewProps> = ({
  currentRoom,
  onRoomChange,
  gooseState,
  onFeedGoose,
  money,
  onMoneyChange,
}) => {
  const handleBuyItem = (item: string, cost: number) => {
    if (money >= cost) {
      onMoneyChange(money - cost);
      if (item === "carrot") {
        onFeedGoose("carrot");
      } else if (item === "bread") {
        onFeedGoose("bread");
      }
    }
  };

  const renderLivingRoom = () => (
    <div className="flex-1 living-room-bg flex flex-col items-center justify-center relative">
      <div className="text-center mb-8">
        <h2 className="pixel-font text-3xl text-white mb-4">🏠 Гостиная</h2>
        <p className="text-white/70">Ваш гусь отдыхает здесь</p>
      </div>

      <div className="relative">
        <GooseCharacter gooseState={gooseState} />
      </div>

      {/* Carrot on floor */}
      <div
        className="absolute bottom-32 left-1/3 cursor-pointer hover:scale-110 transition-transform"
        onClick={() => onFeedGoose("carrot")}
      >
        <div className="text-4xl">🥕</div>
        <div className="text-xs text-white text-center">морковка</div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-4 flex space-x-4">
        <button
          onClick={() => onRoomChange("kitchen")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded pixel-font"
        >
          🍳 Кухня
        </button>
        <button
          onClick={() => onRoomChange("computer")}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded pixel-font"
        >
          💻 Компьютер
        </button>
      </div>
    </div>
  );

  const renderKitchen = () => (
    <div className="flex-1 kitchen-bg flex flex-col items-center justify-center relative">
      <div className="text-center mb-8">
        <h2 className="pixel-font text-3xl text-white mb-4">🍳 Кухня</h2>
        <p className="text-white/70">Готовьте еду для гуся</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div
          className="bg-white/10 p-4 rounded cursor-pointer hover:bg-white/20 text-center"
          onClick={() => onFeedGoose("carrot")}
        >
          <div className="text-4xl mb-2">🥕</div>
          <div className="text-white pixel-font">Морковка</div>
          <div className="text-green-400 text-sm">Любимая еда!</div>
        </div>
        <div
          className="bg-white/10 p-4 rounded cursor-pointer hover:bg-white/20 text-center"
          onClick={() => onFeedGoose("bread")}
        >
          <div className="text-4xl mb-2">🍞</div>
          <div className="text-white pixel-font">Хлеб</div>
          <div className="text-blue-400 text-sm">Обычная еда</div>
        </div>
      </div>

      <button
        onClick={() => onRoomChange("living")}
        className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded pixel-font"
      >
        🏠 Гостиная
      </button>
    </div>
  );

  const renderComputerRoom = () => (
    <div className="flex-1 computer-bg flex flex-col items-center justify-center relative">
      <div className="text-center mb-8">
        <h2 className="pixel-font text-3xl text-white mb-4">💻 Компьютер</h2>
        <p className="text-white/70">Магазин для гуся</p>
      </div>

      <div className="bg-black/70 p-6 rounded-lg border-2 border-cyan-400 max-w-md w-full">
        <h3 className="pixel-font text-xl text-cyan-400 mb-4 text-center">
          🛒 ГУСИ-ШОП
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center bg-white/10 p-3 rounded">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🥕</span>
              <span className="text-white">Морковка</span>
            </div>
            <button
              onClick={() => handleBuyItem("carrot", 10)}
              disabled={money < 10}
              className="px-3 py-1 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 text-white rounded text-sm"
            >
              10₽
            </button>
          </div>

          <div className="flex justify-between items-center bg-white/10 p-3 rounded">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🍞</span>
              <span className="text-white">Хлеб</span>
            </div>
            <button
              onClick={() => handleBuyItem("bread", 5)}
              disabled={money < 5}
              className="px-3 py-1 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 text-white rounded text-sm"
            >
              5₽
            </button>
          </div>

          <div className="flex justify-between items-center bg-white/10 p-3 rounded">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🧸</span>
              <span className="text-white">Игрушка</span>
            </div>
            <button
              disabled={money < 25}
              className="px-3 py-1 bg-gray-600 text-white rounded text-sm"
            >
              25₽ (скоро)
            </button>
          </div>
        </div>

        <div className="mt-4 text-center text-yellow-400 pixel-font">
          Баланс: {money}₽
        </div>
      </div>

      <button
        onClick={() => onRoomChange("living")}
        className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded pixel-font"
      >
        🏠 Гостиная
      </button>
    </div>
  );

  return (
    <>
      {currentRoom === "living" && renderLivingRoom()}
      {currentRoom === "kitchen" && renderKitchen()}
      {currentRoom === "computer" && renderComputerRoom()}
    </>
  );
};

export default HouseView;
