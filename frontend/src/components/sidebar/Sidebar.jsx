import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useConversation from "../../zustand/useConversation";
import SearchInput from "./SearchInput";
// import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation"
import Conversation from "./Conversation";
import { useSocketContext } from "../../context/SocketContext";

const Sidebar = ({ onSelectChat }) => {
  const { authUser, setAuthUser, setSelectedConversation, selectedConversation } = useConversation();

  useEffect(() => {
    const storedUser = localStorage.getItem("chat-user");
    if (storedUser && !authUser) {
      setAuthUser(JSON.parse(storedUser));
    }
  }, [authUser, setAuthUser]);

  const { users } = useGetConversation();
  const { onlineUsers } = useSocketContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the auth user from context and local storage
    localStorage.removeItem("chat-user");
    setAuthUser(null);
    // Redirect to login page
    navigate("/login", { replace: true });
    // Force reload to reset all state
    window.location.reload();
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation); // Zustand global state
    if (onSelectChat) {
      onSelectChat(conversation);
    }
  };

  return (
    <div className="flex flex-col h-full backdrop-blur-md bg-black/30 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.37)] border border-white/10">
      {/* Sidebar Header */}
      <div className="px-4 py-3 border-b border-white/10">
        <h1 className="text-xl font-bold text-white">Messages</h1>
      </div>

      {/* Search Input */}
      <div className="p-4 border-b border-white/10">
        <SearchInput />
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-auto bg-black/10 rounded-2xl m-2">
        <div className="px-2 py-2 space-y-2">
          {users.map((user) => {
            const isOnline = onlineUsers.includes(user._id);
            const lastMsg = user.lastMessage;
            return (
              <Conversation
                key={user._id}
                conversation={{
                  ...user,
                  userName: user.fullName || user.username,
                  userInitials: (user.fullName || user.username || "JD")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase(),
                  isOnline,
                  lastMessage: lastMsg ? lastMsg.message : "",
                  lastMessageTime: lastMsg ? new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
                  unreadCount: 0, // You can enhance this if you track unread messages
                }}
                isSelected={selectedConversation?._id === user._id}
                onClick={handleSelectConversation}
              />
            );
          })}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
            <span className="text-sm font-medium text-white">{ authUser?.username[0].toUpperCase()}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-white">{authUser?.fullName || authUser?.username}</h3>
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
