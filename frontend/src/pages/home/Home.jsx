import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="flex w-full h-screen bg-black/30 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10">
      <div className="flex-[1] border-r border-white/10">
        <Sidebar onSelectChat={handleSelectChat} />
      </div>
      <div className="flex-[2]">
        <MessageContainer selectedChat={selectedChat} />
      </div>
    </div>
  );
};

export default Home;