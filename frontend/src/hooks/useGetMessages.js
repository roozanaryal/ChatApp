import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { baseUrl } from "./useSignup";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        // console.log("conversationCheck",selectedConversation._id);
        const res = await fetch(
          `${baseUrl}/api/messages/${selectedConversation._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("chat-token")}`,
            },
          }
        );
        const data = await res.json();
        // console.log('Fetched messages response:', data); // Debug log
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch messages');
        }
        // Handle both array and object (with messages property) responses
        if (Array.isArray(data)) {
          setMessages(data);
        } else if (Array.isArray(data.messages)) {
          setMessages(data.messages);
        } else {
          setMessages([]);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
