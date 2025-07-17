import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
// import useListenMessages from "../../hooks/useListenMessages";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  if (!message || !authUser) return null;

  // Support both senderId and sender (backend may use either)
  const senderId = message.senderId || message.sender;
  const isSender = senderId === authUser._id;

  let chatTime = '';
  if (message.createdAt) {
    const date = new Date(message.createdAt);
    chatTime = isNaN(date.getTime()) ? '' : date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return isSender ? (
    <SentMessage message={message} time={chatTime} />
  ) : (
    <ReceivedMessage
      message={message}
      time={chatTime}
      user={selectedConversation}
    />
  );
};

const SentMessage = ({ message, time }) => {
  return (
    <div className="flex items-start gap-2.5 flex-row-reverse">
      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-medium text-white">ME</span>
      </div>
      <div className="flex flex-col gap-1 items-end min-w-0 max-w-[80%]">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs">{time}</span>
          <span className="text-white text-sm font-medium">You</span>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-2 rounded-2xl rounded-tr-none text-white text-sm">
          {message.message}
        </div>
      </div>
    </div>
  );
};

const ReceivedMessage = ({ message, time, user }) => {
  // Get the first letter of the user's full name, fallback to "U"
  const initial = user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U";

  return (
    <div className="flex items-start gap-2.5">
      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-medium text-white">{initial}</span>
      </div>
      <div className="flex flex-col gap-1 min-w-0 max-w-[80%]">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-medium">
            {user?.fullName}
          </span>
          <span className="text-gray-400 text-xs">{time}</span>
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-tl-none text-white text-sm">
          {message.message}
        </div>
      </div>
    </div>
  );
};

export default Message;
