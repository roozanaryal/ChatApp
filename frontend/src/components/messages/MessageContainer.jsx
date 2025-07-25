import React, { useEffect, useRef } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
const MessageContainer = () => {
  useListenMessages();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { messages, loading } = useGetMessages();

  const selectedChat = selectedConversation;
  const bottomRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    //cleanup function to reset selected chat when component unmounts
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-col h-full backdrop-blur-md bg-black/30 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.37)] border border-white/10 text-white">
      {selectedChat ? (
        <>
          <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3 bg-black/20 rounded-t-3xl">
            <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center text-lg font-bold text-purple-200">
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
            {loading ? (
              <div className='flex justify-center items-center h-full'>
                <span className='loading loading-spinner'></span>
              </div>
            ) : (
              Array.isArray(messages) && messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((message, idx) => (
                    <Message key={message._id || idx} message={message} />
                  ))}
                  <div ref={bottomRef} />
                </div>
              ) : (
                <div className="text-center text-gray-400">No messages yet.</div>
              )
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-white/10 bg-black/20 rounded-b-3xl">
            <MessageInput />
          </div>
        </>
      ) : (
        // Initial state when no chat is selected
        <div className="flex-1 flex items-center justify-center text-gray-400 text-lg">
          <p>Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
