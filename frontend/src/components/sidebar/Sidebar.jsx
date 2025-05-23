import React, { useState } from "react";
import SearchInput from "./SearchInput";
import Conversation from "./Conversation";

const Sidebar = ({ onSelectChat }) => {
   // This would be replaced with actual data from your backend
   const demoConversations = [
      {
         id: 1,
         userName: "John Doe",
         userInitials: "JD",
         lastMessage: "Hey, how are you doing?",
         lastMessageTime: "2m",
         unreadCount: 2,
         isOnline: true,
      },
      {
         id: 2,
         userName: "Jane Smith",
         userInitials: "JS",
         lastMessage: "The project is coming along nicely!",
         lastMessageTime: "1h",
         unreadCount: 0,
         isOnline: true,
      },
      {
         id: 3,
         userName: "Robert Johnson",
         userInitials: "RJ",
         lastMessage: "Can we meet tomorrow?",
         lastMessageTime: "3h",
         unreadCount: 1,
         isOnline: false,
      },
      {
         id: 4,
         userName: "Emily Davis",
         userInitials: "ED",
         lastMessage: "Thanks for your help!",
         lastMessageTime: "1d",
         unreadCount: 0,
         isOnline: false,
      },
   ];

   const [selectedConversation, setSelectedConversation] = useState(null);

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
               {demoConversations.map((conversation) => (
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
               <button className="text-gray-400 hover:text-white transition-colors">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5"
                     viewBox="0 0 20 20"
                     fill="currentColor"
                  >
                     <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
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
