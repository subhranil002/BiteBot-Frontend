import { FaRobot,FaUser } from "react-icons/fa";

const ChatMessage = ({ message }) => {
    const { type, text, recipes = [], timestamp } = message;
    const isBot = type === "bot";
    const isUser = type === "user";

    const formatTime = (date) => {
        return new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };

    return (
        <div
            className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
        >
            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isBot
                        ? "bg-primary text-primary-content"
                        : "bg-secondary text-secondary-content"
                }`}
            >
                {isBot ? (
                    <FaRobot className="w-4 h-4" />
                ) : (
                    <FaUser className="w-4 h-4" />
                )}
            </div>
            <div
                className={`flex flex-col gap-2 max-w-[80%] ${
                    isUser ? "items-end" : "items-start"
                }`}
            >
                <div
                    className={`px-4 py-2 rounded-lg ${
                        isUser
                            ? "bg-primary text-primary-content"
                            : "bg-base-200 border border-gray-200"
                    }`}
                >
                    <p className="text-sm whitespace-pre-wrap">{text}</p>
                </div>
                {recipes.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                        {recipes.map((recipe) => (
                            <div key={recipe.id} className="max-w-sm">
                                Recipe Here!
                            </div>
                        ))}
                    </div>
                )}
                <span
                    className={`text-xs text-gray-400 ${
                        isUser ? "text-right" : "text-left"
                    }`}
                >
                    {formatTime(timestamp)}
                </span>
            </div>
        </div>
    );
};

export default ChatMessage;
