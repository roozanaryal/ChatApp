import React, { useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  // This would be replaced with actual state management in your logic implementation
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex flex-col h-full">
      {selectedChat ? (
        <>
          {/* Chat Header */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
              <span className="text-sm font-medium text-white">{selectedChat.userInitials || "JD"}</span>
            </div>
            <div>
              <h2 className="text-white font-medium">{selectedChat.userName || "John Doe"}</h2>
              <p className="text-xs text-gray-400">{selectedChat.status || "Active now"}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4">
            <Messages selectedChat={selectedChat} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-white/10">
            <MessageInput />
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-auto">
          <Messages selectedChat={selectedChat} />
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
