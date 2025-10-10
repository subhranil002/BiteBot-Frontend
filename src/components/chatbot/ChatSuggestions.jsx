const ChatSuggestions = ({ suggestions = [], onSuggestionClick }) => {
    if (suggestions.length === 0) return null;
    return (
        <div className="px-4 py-2 border-t bg-base-200">
            <div className="flex flex-wrap gap-2">
                <span className="text-xs text-gray-400 self-center mr-2">
                    Quick suggestions:
                </span>
                {suggestions.map((suggestion, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => onSuggestionClick(suggestion)}
                        className="btn btn-xs btn-outline"
                        style={{ height: 28 }}
                    >
                        {suggestion}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChatSuggestions;
