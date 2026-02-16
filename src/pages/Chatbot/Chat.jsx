import { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaPaperPlane,
  FaRobot,
  FaUtensils,
  FaLightbulb,
  FaGlobe,
  FaChevronDown
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import generateResponseApi from "../../apis/chatbot/generateResponseApi";

const ChatbotPage = () => {
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [mode, setMode] = useState("recipe");
  const [language, setLanguage] = useState("en");

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
    "Search italian recipes",
    "Find recipes that I can make with eggs?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    setIsLoading(true);

    const userMessage = {
      id: uuidv4(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
      recipes: [],
    };

    setInputMessage("");
    setMessages((prev) => [...prev, userMessage]);

    // const languageNames = { en: "English", hi: "Hindi", bn: "Bengali" };
    // const contextPrompt = `[Context: User wants ${mode === 'recipe' ? 'Recipes' : 'Cooking Tips'}. Please answer in ${languageNames[language]}.] ${userMessage.content}`;

    const response = await generateResponseApi(userMessage.content);

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

  function modifyCloudinaryURL(url) {
    if (url === "" || url === null) return "";
    if (import.meta.env.VITE_IMAGE_TRANSFORMATION === "true") {
      return url.replace(
        "/upload/",
        "/upload/ar_1:1,c_auto,g_auto,w_500/r_max/"
      );
    }
    return url;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex flex-col">
      {/* Header with Back Button */}
      <header className="relative border-b border-orange-100/50 backdrop-blur-sm py-6 px-4 sm:px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-sm absolute left-4 top-4 sm:left-6 sm:top-auto sm:bottom-auto bg-orange-500 text-white hover:bg-white hover:text-orange-500 border-orange-500 backdrop-blur-sm shadow-sm hover:shadow transition-all duration-300 rounded-full flex items-center gap-2"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Title & Subtitle */}
        <div className="flex flex-col items-center justify-center text-center mt-10 sm:mt-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FaRobot className="text-orange-500" />
            BiteBot
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Discover. Cook. Impress. Repeat
          </p>
          <span className="badge badge-sm badge-warning align-middle mr-1 bg-orange-500 text-white">
            BETA
          </span>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 pb-[19rem] pt-4">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${msg.type === "user" ? "flex-row-reverse" : ""
                  }`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-md ${msg.type === "user"
                        ? "bg-gradient-to-br from-orange-500 to-amber-600"
                        : "bg-gradient-to-br from-gray-600 to-gray-800"
                      }`}
                  >
                    {msg.type === "user" ? (
                      <img
                        src={modifyCloudinaryURL(
                          userData?.profile?.avatar?.secure_url
                        )}
                        alt="user avatar"
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <FaRobot />
                    )}
                  </div>
                </div>

                {/* Message Bubble */}
                <div>
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line shadow-sm ${msg.type === "user"
                        ? "bg-gradient-to-br from-orange-500 to-amber-600 text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                      }`}
                  >
                    {msg.content}
                  </div>

                  {/* Recipes Grid */}
                  {msg.recipes?.length > 0 && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {msg.recipes.map((recipe) => {
                        return (
                          <div
                            key={recipe._id.toString()}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 relative"
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
                                <button
                                  onClick={() =>
                                    navigate(`/recipe/${recipe._id.toString()}`)
                                  }
                                  className="not-[]:text-xs px-3 py-1 rounded-full hover:scale-105 transition-transform bg-orange-500 text-white hover:bg-orange-600 cursor-pointer"
                                >
                                  View
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
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

      {/* Floating Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 px-4 py-4 z-50">
        <div className="max-w-4xl mx-auto space-y-3">

          {/* Controls (Mode Toggle + Language) */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">

            {/* Mode Switcher */}
            <div className="flex bg-gray-100 p-1 rounded-xl w-full sm:w-auto">
              <button
                onClick={() => setMode('recipe')}
                className={`flex-1 sm:flex-none flex cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${mode === 'recipe'
                    ? 'bg-white text-orange-600 shadow-sm ring-1 ring-black/5'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                <FaUtensils className={mode === 'recipe' ? 'text-orange-500' : 'text-gray-400'} />
                Find Recipe
              </button>
              <button
                onClick={() => setMode('tips')}
                className={`flex-1 sm:flex-none flex cursor-pointer items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${mode === 'tips'
                    ? 'bg-white text-amber-600 shadow-sm ring-1 ring-black/5'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                <FaLightbulb className={mode === 'tips' ? 'text-amber-500' : 'text-gray-400'} />
                Cooking Tips
              </button>
            </div>

            {/* Language Selector */}
            <div className="relative w-full sm:w-auto">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <FaGlobe />
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full sm:w-40 appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl pl-9 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 cursor-pointer transition-all hover:bg-gray-100"
              >
                <option value="en">English</option>
                <option value="hi">Hindi (हिंदी)</option>
                <option value="bn">Bengali (বাংলা)</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">
                <FaChevronDown />
              </div>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {quickSuggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => setInputMessage(suggestion)}
                className="text-xs px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-full hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-colors"
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
              placeholder={mode === 'recipe' ? "Ask for a recipe or list ingredients..." : "Ask for cooking tips (e.g. how to chop onions)..."}
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
              rows={1}
              disabled={isLoading}
              style={{ fieldSizing: "content", maxHeight: "120px" }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className={`p-3 rounded-full transition-all shrink-0 ${inputMessage.trim() && !isLoading
                  ? "bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <FaPaperPlane className="w-5 h-5 pl-0.5" />
              )}
            </button>
          </div>

          <p className="text-[10px] text-gray-400 text-center">
            Press <kbd className="kbd kbd-xs">Enter</kbd> to send • BiteBot may
            occasionally provide inaccurate information
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;