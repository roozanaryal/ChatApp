import React from "react";

const MessageInput = () => {
  return (
    <form className="flex items-center gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all text-sm pr-10"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <button
        type="submit"
        className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:from-purple-700 hover:to-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black/40 transition-all duration-200 shadow-xl hover:shadow-purple-500/25"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </form>
  );
};

export default MessageInput;
