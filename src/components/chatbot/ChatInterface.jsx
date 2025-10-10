import { useEffect,useRef, useState } from "react";
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
        <div className="flex flex-col h-full bg-base-100">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                ))}
                {isTyping && (
                    <div className="flex items-center gap-2 text-gray-400">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <FaSpinner className="animate-spin w-4 h-4" />
                        </div>
                        <span className="text-sm">BiteBot is thinking...</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <ChatSuggestions
                suggestions={hardcodedSuggestions}
                onSuggestionClick={handleSuggestionClick}
            />
            <div className="border-t bg-base-200 p-4">
                <form onSubmit={handleSubmit} className="flex items-end gap-2">
                    <div className="flex-1">
                        <textarea
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask me about recipes, ingredients, or cooking techniques..."
                            className="w-full p-3 bg-base-100 border rounded-lg text-sm resize-none focus:outline-none focus:ring focus:border-none min-h-[44px] max-h-32"
                            rows={1}
                            disabled={isTyping}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        className="btn btn-primary btn-square shrink-0"
                        style={{ minWidth: 44, minHeight: 44 }}
                    >
                        {isTyping ? (
                            <FaSpinner className="animate-spin w-4 h-4" />
                        ) : (
                            <FaPaperPlane className="w-4 h-4" />
                        )}
                    </button>
                </form>
                <p className="text-xs text-gray-400 mt-2 text-center">
                    Press Enter to send, Shift+Enter for new line
                </p>
            </div>
        </div>
    );
};

export default ChatInterface;
