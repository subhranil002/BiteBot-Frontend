import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";

import ChatMessage from "./ChatMessage";
import ChatSuggestions from "./ChatSuggestions";

const hardcodedMessages = [
  {
    id: 1,
    text: "Hello! How can I help?",
    type: "bot",
    timestamp: new Date(),
  },
  {
    id: 2,
    text: "What are some quick recipes?",
    type: "user",
    timestamp: new Date(),
  },
];

const hardcodedSuggestions = [
  "Show easy pasta recipes",
  "What is gluten free?",
  "Best vegan breakfast",
];

const ChatInterface = () => {
  const [messages, setMessages] = useState(hardcodedMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = (message) => {
    setIsTyping(true);
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text: message,
        type: "user",
        timestamp: new Date(),
      },
    ]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Here is your answer!",
          type: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isTyping) {
      sendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (!isTyping) {
      sendMessage(suggestion);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white/50 via-orange-50/40 to-amber-50/50">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            className="bg-white/50 backdrop-blur-md border border-orange-100 rounded-2xl p-3 shadow-md"
          />
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-100 to-amber-100/50 rounded-full flex items-center justify-center shadow-inner">
              <FaSpinner className="animate-spin w-4 h-4 text-orange-500" />
            </div>
            <span className="text-sm text-gray-600">
              BiteBot is thinking...
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      <ChatSuggestions
        suggestions={hardcodedSuggestions}
        onSuggestionClick={handleSuggestionClick}
        className="bg-white/50 backdrop-blur-md border border-orange-100 rounded-2xl p-3 shadow-md"
      />

      {/* Input Area */}
      <div className="border-t border-orange-100 bg-white/70 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-t-2xl">
        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-2 w-full"
        >
          {/* Textarea wrapper */}
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me about recipes"
              className="w-full px-3 py-2 bg-white border border-orange-200 rounded-2xl text-sm resize-none
                   focus:outline-none focus:ring-2 focus:ring-orange-300
                   min-h-[44px] max-h-32 overflow-y-auto shadow-inner
                   sm:text-base"
              rows={1}
              disabled={isTyping}
            />
          </div>

          {/* Send button */}
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="flex items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-red-400
                 text-white shadow-md hover:opacity-90 transition-all
                 disabled:opacity-50 disabled:cursor-not-allowed
                 w-11 h-11 sm:w-12 sm:h-12 shrink-0 cursor-pointer"
          >
            {isTyping ? (
              <FaSpinner className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <FaPaperPlane className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </form>

        <p className="text-[11px] sm:text-xs text-gray-500 mt-2 text-center">
          Press <span className="font-medium">Enter</span> to send, <span className="font-medium">Shift+Enter</span> for new line
        </p>
      </div>

    </div>
  );

};

export default ChatInterface;
