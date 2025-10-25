import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

import generateResponseApi from "../../apis/chatbot/generateResponseApi";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: uuidv4(),
      type: "assistant",
      content:
        "Hey! I'm BiteBot — your smart recipe assistant.\nTell me what you have in the fridge or what you're craving!",
      recipes: [],
      timestamp: new Date(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickSuggestions = [
    "Search indian chicken recipes",
    "Find veg high protein recipes",
    "Search punjabi recipes",
    "Find recipes that I can make with eggs?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const toInputItems = (msgs) =>
    msgs.map((m) => ({
      type: "message",
      role: m.type === "assistant" ? "assistant" : "user",
      content: [
        {
          type: m.type === "assistant" ? "output_text" : "input_text",
          text: String(m.content),
        },
      ],
    }));

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: uuidv4(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
      recipes: [],
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    const chatHistory = toInputItems([...messages, userMessage]);
    const response = await generateResponseApi(chatHistory);

    const botMessage = {
      id: uuidv4(),
      type: "assistant",
      content:
        response?.data?.reply ??
        "Hmm, I couldn't think of anything. Try again!",
      recipes: response?.data?.recipes ?? [],
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex flex-col">
      {/* Header */}
      <header className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <FaRobot className="text-orange-500" />
          BiteBot
        </h1>
        <p className="text-sm text-gray-500 mt-1">Your minimalist recipe AI</p>
      </header>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 pb-[13rem] pt-4">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${
                  msg.type === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-md ${
                      msg.type === "user"
                        ? "bg-gradient-to-br from-orange-500 to-amber-600"
                        : "bg-gradient-to-br from-gray-600 to-gray-800"
                    }`}
                  >
                    {msg.type === "user" ? <FaUser /> : <FaRobot />}
                  </div>
                </div>

                {/* Message Bubble */}
                <div>
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-sm ${
                      msg.type === "user"
                        ? "bg-gradient-to-br from-orange-500 to-amber-600 text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Recipes Grid */}
                  {msg.recipes?.length > 0 && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {msg.recipes.map((recipe) => (
                        <div
                          key={recipe._id}
                          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                        >
                          <img
                            src={recipe.thumbnail?.secure_url}
                            alt={recipe.title}
                            className="w-full h-32 object-cover"
                          />
                          <div className="p-3">
                            <h3 className="font-medium text-gray-800 text-sm line-clamp-1">
                              {recipe.title}
                            </h3>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-orange-600 font-medium">
                                {recipe.cuisine}
                              </span>
                              <button className="text-xs px-3 py-1 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
                                View
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white">
                  <FaRobot />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-2">
                  <div className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce delay-200"></span>
                  </div>
                  <span className="text-sm text-gray-600">
                    Cooking up ideas...
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Floating Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-2 mb-3 justify-center">
            {quickSuggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => setInputMessage(suggestion)}
                className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-orange-100 hover:text-orange-600 transition"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Input + Send */}
          <div className="flex gap-3 items-end">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask for a recipe or list ingredients..."
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
              rows={1}
              disabled={isLoading}
              style={{ fieldSizing: "content", maxHeight: "120px" }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className={`p-3 rounded-full transition-all ${
                inputMessage.trim() && !isLoading
                  ? "bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <FaPaperPlane className="w-5 h-5" />
              )}
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-2">
            Press <kbd className="kbd kbd-xs">Enter</kbd> to send • BiteBot may
            suggest creatively
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
