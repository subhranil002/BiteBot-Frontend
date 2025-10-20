import { useEffect, useRef, useState } from "react";
import {
  FaPaperPlane,
  FaRobot,
  FaSearch,
  FaUser,
  FaUtensils,
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

import generateResponseApi from "../../apis/chatbot/generateResponseApi";
import HomeLayout from "../../layouts/HomeLayout";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: uuidv4(),
      type: "assistant",
      content:
        "Hello! I'm BiteBot 🤖\nI can help you find amazing recipes based on ingredients you have or what you're craving! What would you like to cook today?",
      recipes: [],
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const toInputItems = (msgs) =>
    msgs.map((m) => ({
      type: "message",
      role: m.type === "assistant" ? "assistant" : "user",
      content: [
        {
          type: m.type === "assistant" ? "output_text" : "input_text",
          text: String(m.content ?? ""),
        },
      ],
    }));

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    setIsLoading(true);

    const chatHistory = toInputItems(messages);
    const newUserItem = {
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: inputMessage }],
    };
    chatHistory.push(newUserItem);

    const userMessage = {
      id: uuidv4(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
      recipes: [],
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    const response = await generateResponseApi(chatHistory);
    const botMessage = {
      id: uuidv4(),
      type: "assistant",
      content: response?.data?.reply ?? "Sorry, I couldn't find an answer.",
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

  const quickSuggestions = [
    "What can I make with chicken and rice?",
    "Show me quick vegetarian recipes",
    "I have eggs, cheese, and bread",
    "Healthy dinner ideas",
  ];

  return (
    <HomeLayout>
      <div className="min-h-screen bg-gradient-to-br from-base-100 via-orange-50 to-amber-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Quick Suggestions */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card bg-base-100 shadow-sm">
                <div className="card-body p-6">
                  <h3 className="card-title text-lg flex items-center gap-2">
                    <FaSearch className="text-orange-500" />
                    Quick Suggestions
                  </h3>
                  <div className="space-y-3 mt-4">
                    {quickSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setInputMessage(suggestion)}
                        className="btn btn-outline btn-sm justify-start text-left h-auto py-3 px-4 normal-case font-normal hover:bg-orange-50 hover:border-orange-300"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-sm">
                <div className="card-body p-6">
                  <h3 className="card-title text-lg flex items-center gap-2">
                    <FaUtensils className="text-amber-500" />
                    Tips
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li>• List ingredients you have</li>
                    <li>• Mention dietary preferences</li>
                    <li>• Ask for quick or healthy options</li>
                    <li>• Specify cuisine types</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="lg:col-span-3">
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body p-0">
                  {/* Messages Container */}
                  <div
                    ref={messagesContainerRef}
                    className="h-[60vh] overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-base-100 to-base-200"
                  >
                    {messages.map((message) => (
                      <div key={message.id} className="space-y-2">
                        {/* Message Row */}
                        <div
                          className={`chat ${
                            message.type === "user" ? "chat-end" : "chat-start"
                          }`}
                        >
                          <div className="chat-image avatar">
                            <div
                              className={`w-10 rounded-full ${
                                message.type === "user"
                                  ? "bg-primary text-primary-content"
                                  : "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                              }`}
                            >
                              {message.type === "user" ? (
                                <FaUser className="w-5 h-5" />
                              ) : (
                                <FaRobot className="w-5 h-5" />
                              )}
                            </div>
                          </div>

                          <div className="chat-header mb-1">
                            {message.type === "user" ? "You" : "BiteBot"}
                            <time className="text-xs opacity-50 ml-2">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </time>
                          </div>

                          <div
                            className={`chat-bubble ${
                              message.type === "user"
                                ? "chat-bubble-primary"
                                : "bg-gradient-to-r from-orange-100 to-amber-100 text-gray-800 border border-orange-200"
                            }`}
                          >
                            {/* Render multiline content properly */}
                            {String(message.content)
                              .split("\n")
                              .map((line, i) => (
                                <p key={i} className="mb-0">
                                  {line}
                                </p>
                              ))}
                          </div>
                        </div>

                        {/* Recipe Cards as a separate chat row */}
                        {message.recipes && message.recipes.length > 0 && (
                          <div
                            className={`chat ${
                              message.type === "user"
                                ? "chat-end"
                                : "chat-start"
                            }`}
                            key={`${message.id}-recipes`}
                          >
                            {/* Use a transparent bubble to anchor grid where a message would be */}
                            <div className="chat-bubble p-0 bg-transparent border-0 shadow-none">
                              <div className="mt-2 w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {message.recipes.map((recipe) => (
                                    <div
                                      key={recipe._id}
                                      className="card card-compact bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-shadow duration-300"
                                      style={{ minWidth: 220 }}
                                    >
                                      <figure className="h-32">
                                        <img
                                          src={recipe.thumbnail?.secure_url}
                                          alt={recipe.title}
                                          className="w-full h-full object-cover"
                                        />
                                      </figure>
                                      <div className="card-body p-4">
                                        <h3 className="card-title text-sm font-semibold line-clamp-2">
                                          {recipe.title}
                                        </h3>
                                        <div className="card-actions justify-between items-center mt-2">
                                          <span className="badge badge-outline badge-sm">
                                            {recipe.cuisine}
                                          </span>
                                          <button className="btn btn-primary btn-sm">
                                            View Recipe
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {isLoading && (
                      <div className="chat chat-start">
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white">
                            <FaRobot className="w-5 h-5" />
                          </div>
                        </div>
                        <div className="chat-header mb-1">BiteBot</div>
                        <div className="chat-bubble bg-gradient-to-r from-orange-100 to-amber-100 text-gray-800 border border-orange-200">
                          <span className="loading loading-dots loading-sm"></span>
                          Searching for recipes...
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Area */}
                  <div className="p-6 border-t border-base-300 bg-base-100">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <textarea
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Tell me what ingredients you have or what you're craving..."
                          className="textarea textarea-bordered w-full h-20 resize-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                          disabled={isLoading}
                        />
                      </div>
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        className="btn btn-primary btn-lg h-20 px-6 self-end transition-all duration-300 transform hover:scale-105 disabled:transform-none"
                      >
                        {isLoading ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <FaPaperPlane className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                      <span>Press Enter to send</span>
                      <span>
                        BiteBot may produce inaccurate information about recipes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default ChatbotPage;
