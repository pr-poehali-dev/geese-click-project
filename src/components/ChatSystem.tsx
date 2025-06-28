import React, { useState, useEffect } from "react";
import { GooseState } from "@/pages/Index";

interface ChatSystemProps {
  isOpen: boolean;
  onClose: () => void;
  gooseState: GooseState;
  onResponse: (type: "kind" | "mean" | "neutral") => void;
}

interface Message {
  id: string;
  text: string;
  sender: "goose" | "player";
  timestamp: Date;
}

const ChatSystem: React.FC<ChatSystemProps> = ({
  isOpen,
  onClose,
  gooseState,
  onResponse,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showResponseOptions, setShowResponseOptions] = useState(false);

  const gooseMessages = {
    happy: [
      "Га-га! Как дела, хозяин? 😊",
      "Спасибо за морковку! Ты лучший! 🥕",
      "Я так рад что мы друзья! Га-га-га!",
      "Хочешь поиграть со мной? 🎮",
    ],
    angry: [
      "ГА-ГА-ГА! Я очень злой! 😠",
      "Почему ты меня не кормишь?!",
      "Я тебя съем если будешь так плохо обращаться!",
      "ГА! Ты ужасный хозяин!",
    ],
    hungry: [
      "Хозяин... я так голоден... 🤤",
      "Можешь дать мне морковку? Пожалуйста?",
      "У меня урчит в животе... га-га...",
      "Я не ел уже целую вечность!",
    ],
    neutral: [
      "Привет, хозяин! Как дела? 👋",
      "Что нового? Га-га!",
      "Скучно... Развлеки меня!",
      "Поговорим? 💬",
    ],
  };

  const responseOptions = {
    kind: [
      "Привет, милый гусь! 😊",
      "Конечно, я принесу тебе морковку! 🥕",
      "Ты такой хороший гусь! 💕",
      "Давай поиграем вместе! 🎮",
    ],
    mean: [
      "Отстань от меня! 😤",
      "Сам найди себе еду! 🙄",
      "Ты надоедливый гусь! 😠",
      "Заткнись и не мешай! 🤐",
    ],
    neutral: [
      "Ладно, хорошо... 😐",
      "Может быть... 🤔",
      "Посмотрим... ⏰",
      "Я подумаю об этом 💭",
    ],
  };

  // Add goose message when chat opens or mood changes
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addGooseMessage();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      // Random chance for goose to speak
      const timer = setTimeout(
        () => {
          if (Math.random() < 0.4) {
            addGooseMessage();
          }
        },
        3000 + Math.random() * 5000,
      );

      return () => clearTimeout(timer);
    }
  }, [messages, gooseState.mood, isOpen]);

  const addGooseMessage = () => {
    const moodMessages = gooseMessages[gooseState.mood];
    const randomMessage =
      moodMessages[Math.floor(Math.random() * moodMessages.length)];

    const newMessage: Message = {
      id: Date.now().toString(),
      text: randomMessage,
      sender: "goose",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setShowResponseOptions(true);
  };

  const handleResponse = (type: "kind" | "mean" | "neutral") => {
    const responses = responseOptions[type];
    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    const playerMessage: Message = {
      id: Date.now().toString(),
      text: randomResponse,
      sender: "player",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, playerMessage]);
    setShowResponseOptions(false);
    onResponse(type);

    // Goose responds after player
    setTimeout(
      () => {
        addGooseMessage();
      },
      1000 + Math.random() * 2000,
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border-2 border-cyan-400 rounded-lg w-96 h-96 flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-cyan-400 flex justify-between items-center">
          <h3 className="pixel-font text-cyan-400">💬 Чат с Гошей</h3>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-300 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-2 rounded max-w-xs ${
                message.sender === "goose"
                  ? "bg-blue-600 self-start text-white"
                  : "bg-green-600 self-end text-white ml-auto"
              }`}
            >
              <div className="text-sm">
                {message.sender === "goose" ? "🦢 Гоша" : "👤 Вы"}
              </div>
              <div>{message.text}</div>
            </div>
          ))}
        </div>

        {/* Response options */}
        {showResponseOptions && (
          <div className="p-3 border-t border-cyan-400 space-y-2">
            <div className="text-sm text-gray-400 pixel-font">
              Выберите ответ:
            </div>
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => handleResponse("kind")}
                className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded text-sm text-left"
              >
                😊 Добрый ответ
              </button>
              <button
                onClick={() => handleResponse("neutral")}
                className="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white rounded text-sm text-left"
              >
                😐 Нейтральный ответ
              </button>
              <button
                onClick={() => handleResponse("mean")}
                className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm text-left"
              >
                😠 Злой ответ (+злость)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSystem;
