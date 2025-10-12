const ChatSuggestions = ({ suggestions = [], onSuggestionClick }) => {
    if (suggestions.length === 0) return null;
    return (
        <div className="px-4 py-2 border-t bg-base-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 mr-2">Quick suggestions:</span>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onSuggestionClick(suggestion)}
                className="btn btn-xs btn-outline bg-white/50 backdrop-blur-md border border-orange-100 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      );
      
};

export default ChatSuggestions;
