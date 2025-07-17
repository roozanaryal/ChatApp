import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { baseUrl } from "./useSignup";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${baseUrl}/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("chat-token")}`,
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Ensure the new message is displayed immediately and correctly
      let newMessage = data;
      // If backend doesn't return correct fields, use optimistic update
      if (!newMessage.message || typeof newMessage !== "object") {
        newMessage = {
          message: message, // The actual message text
          sender: selectedConversation?.authUser?._id || "",
          receiver: selectedConversation?._id || "",
          createdAt: new Date().toISOString(),
          _id: Math.random().toString(36).substr(2, 9), // Temporary ID
        };
      } else {
        // If backend returns but missing createdAt, add it
        if (!newMessage.createdAt) {
          newMessage.createdAt = new Date().toISOString();
        }
      }
      setMessages([...messages, newMessage]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
