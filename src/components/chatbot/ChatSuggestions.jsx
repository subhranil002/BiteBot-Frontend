const ChatSuggestions = ({ suggestions = [], onSuggestionClick }) => {
  if (suggestions.length === 0) return null;
  return (
    <div className="px-4 py-2 border-t bg-base-200">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-base-content/60 mr-2">Quick suggestions:</span>
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSuggestionClick(suggestion)}
            className="btn btn-xs btn-outline normal-case border-orange-300 text-orange-600 hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-400 hover:border-transparent hover:text-white transition-all duration-300"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>


  );

};

export default ChatSuggestions;
