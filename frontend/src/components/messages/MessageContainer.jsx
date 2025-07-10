import React, { useEffect } from "react"; // useState is not needed if using Zustand for selectedChat
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation"; // Correct path
// import { set } from "mongoose";

const MessageContainer = () => {
  // Correct way to use the Zustand hook:
  // Destructure the specific state and actions you need from the store.
  // We're taking 'selectedConversation' and 'setSelectedConversation' from the store
  // and aliasing them to 'selectedChat' and 'setSelectedChat' for consistency with
  // your existing component logic.
  const { selectedConversation, setSelectedConversation } = useConversation();

  // If you prefer to keep the names 'selectedChat' and 'setSelectedChat'
  // for readability within this component, you can alias them:
  const selectedChat = selectedConversation;
  // const setSelectedChat = setSelectedConversation; // You don't actually use setSelectedChat here, so it's not strictly necessary to alias it.
  useEffect(() => {
    //cleanup function to reset selected chat when component unmounts
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-col h-full rounded-lg shadow-lg bg-gray-800 text-white">
      {selectedChat ? (
        <>
          {/* Chat Header */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3 bg-gray-700 rounded-t-lg">
            <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center text-lg font-bold text-purple-200">
              {/* Fallback for user initials, ensure selectedChat.fullName exists for reliable initials */}
              <span className="text-sm font-medium text-white">
                {selectedChat.fullName
                  ? selectedChat.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "JD"}
              </span>
            </div>
            <div>
              <h2 className="text-white font-semibold text-lg">
                {selectedChat.fullName || "John Doe"}
              </h2>
              <p className="text-xs text-gray-400">
                {selectedChat.status || "Active now"}
              </p>
            </div>
          </div>

          {/* Messages */}
          {/* Ensure Messages component can handle selectedChat.messages if it expects messages prop */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <Messages selectedChat={selectedChat} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-white/10 bg-gray-700 rounded-b-lg">
            <MessageInput />
          </div>
        </>
      ) : (
        // Initial state when no chat is selected
        <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
          <p>Select a chat to start messaging</p>
          {/* You might want to remove <Messages selectedChat={selectedChat} /> here
              if Messages component expects a valid chat object and not null/undefined.
              If it gracefully handles null, it's fine. */}
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
