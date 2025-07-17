import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, isSelected, onClick }) => {
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-xl ${
        isSelected ? "bg-white/10" : "hover:bg-white/5"
      } transition-colors cursor-pointer`}
      onClick={() => onClick && onClick(conversation)}
    >
      <div
        className={`w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center relative ${
          isOnline ? "border-2 border-green-500" : ""
        }`}
      >
        <span className="text-sm font-medium text-white">
          {conversation?.userInitials || "JD"}
        </span>
        {conversation?.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-black/30"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-white truncate">
          {conversation?.userName || "John Doe"}
        </h3>
        <p className="text-xs text-gray-400 truncate">
          {conversation?.lastMessage?.message || ""}
          {/* useGetConversation */}
          {/* {console.log(conversation)} */}
        </p>
      </div>
      {conversation?.unreadCount > 0 && (
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs text-gray-400">
            {conversation?.lastMessageTime || "2m"}
          </span>
          <span className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-[10px] text-white font-medium">
            {conversation?.unreadCount}
          </span>
        </div>
      )}
    </div>
  );
};

export default Conversation;
