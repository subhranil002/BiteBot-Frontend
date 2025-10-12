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
        <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          {/* Avatar */}
          <div
            className={`avatar shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              isBot ? "bg-primary text-primary-content" : "bg-secondary text-secondary-content"
            }`}
          >
            <div className="text-lg">
              {isBot ? <FaRobot className="w-5 h-5" /> : <FaUser className="w-5 h-5" />}
            </div>
          </div>
      
          {/* Message Content */}
          <div className={`flex flex-col gap-2 max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
            {/* Message Bubble */}
            <div
              className={`card px-4 py-2 rounded-2xl shadow-md ${
                isUser
                  ? "bg-gradient-to-r from-orange-400 to-red-400 text-white border-0"
                  : "bg-white/50 backdrop-blur-md border border-orange-100 text-gray-800"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{text}</p>
            </div>
      
            {/* Recipes Preview */}
            {recipes.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                {recipes.map((recipe) => (
                  <div key={recipe.id} className="card bg-white/50 backdrop-blur-md border border-orange-100 rounded-2xl p-3 shadow-md max-w-sm">
                    {/* You can replace this with RecipeCard later */}
                    <p className="text-sm font-semibold text-gray-800">{recipe.title}</p>
                  </div>
                ))}
              </div>
            )}
      
            {/* Timestamp */}
            <span className={`text-xs text-gray-400 ${isUser ? "text-right" : "text-left"}`}>
              {formatTime(timestamp)}
            </span>
          </div>
        </div>
      );
      
};

export default ChatMessage;
