import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import SearchInput from "./SearchInput";
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation"


const Sidebar = ({ onSelectChat }) => {
  const { loading, conversations } = useGetConversation();

  // This would be replaced with actual data from your backend

  const [selectedConversation, setSelectedConversation] = useState(null);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the auth user from context and local storage
    localStorage.removeItem("chat-user");
    setAuthUser(null);
    // Redirect to login page
    navigate("/login");
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    if (onSelectChat) {
      onSelectChat(conversation);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="px-4 py-3 border-b border-white/10">
        <h1 className="text-xl font-bold text-white">Messages</h1>
      </div>

      {/* Search Input */}
      <div className="p-4 border-b border-white/10">
        <SearchInput />
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-auto">
        <div className="px-2 py-2 space-y-2">
          {conversations.map((conversation) => (
            <Conversation
              key={conversation.id}
              conversation={conversation}
              isSelected={selectedConversation?.id === conversation.id}
              onClick={handleSelectConversation}
            />
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
            <span className="text-sm font-medium text-white">JD</span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-white">John Doe</h3>
            <p className="text-xs text-gray-400">My Account</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-500 transition-colors"
            title="Logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
