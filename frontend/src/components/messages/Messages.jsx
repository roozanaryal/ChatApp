import React from "react";
import Message from "./Message";

const Messages = ({ selectedChat }) => {
  // This would be replaced with actual messages from props or state
  const demoMessages = [
    {
      id: 1,
      senderId: "john",
      senderName: "John Doe",
      senderInitials: "JD",
      text: "Hey! How are you doing?",
      time: "2:30 PM"
    },
    {
      id: 2,
      senderId: "currentUser",
      senderName: "You",
      text: "I'm doing great! Thanks for asking. How about you?",
      time: "2:31 PM"
    },
    {
      id: 3,
      senderId: "john",
      senderName: "John Doe",
      senderInitials: "JD",
      text: "I'm good too! Just working on some new features for the app. It's coming along nicely!",
      time: "2:32 PM"
    },
    {
      id: 4,
      senderId: "currentUser",
      senderName: "You",
      text: "That's awesome! Can't wait to see the final result. Keep up the great work! 🚀",
      time: "2:33 PM"
    }
  ];

  if (!selectedChat) {
    return <NoChatSelected />;
  }

  return (
    <div className="flex flex-col space-y-4">
      {demoMessages.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center p-6 max-w-sm mx-auto">
        <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-1">No conversation selected</h3>
        <p className="text-gray-400 mb-4">Choose a conversation from the sidebar to start chatting</p>
      </div>
    </div>
  );
};

export default Messages;
