import React from "react";

const Message = ({ message }) => {
  const isSender = message.senderId === "currentUser"; // This would be replaced with actual logic

  return isSender ? <SentMessage message={message} /> : <ReceivedMessage message={message} />;
};

const SentMessage = ({ message }) => {
  return (
    <div className="flex items-start gap-2.5 flex-row-reverse">
      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-medium text-white">ME</span>
      </div>
      <div className="flex flex-col gap-1 items-end min-w-0 max-w-[80%]">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs">{message.time}</span>
          <span className="text-white text-sm font-medium">You</span>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-2 rounded-2xl rounded-tr-none text-white text-sm">
          {message.text}
        </div>
      </div>
    </div>
  );
};

const ReceivedMessage = ({ message }) => {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-medium text-white">{message.senderInitials || "JD"}</span>
      </div>
      <div className="flex flex-col gap-1 min-w-0 max-w-[80%]">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-medium">{message.senderName}</span>
          <span className="text-gray-400 text-xs">{message.time}</span>
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-tl-none text-white text-sm">
          {message.text}
        </div>
      </div>
    </div>
  );
};

export default Message;
