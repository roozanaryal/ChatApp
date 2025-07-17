import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { message, setMessage } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessage((prev) => [...prev, newMessage]);
    });
    return () => {
      socket?.off("newMessage");
    };
  }, [socket, message, setMessage]);
};

export default useListenMessages;
