import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";
import { baseUrl } from "./useSignup";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const getMessages = async () => {
    if (!selectedConversation) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("chat-token");
      const res = await axios.get(
        `${baseUrl}/api/messages/${selectedConversation._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      if (data.error) throw new Error(data.error);
      setMessages(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation, setMessages]);

  return { messages, loading, refetch: getMessages };
};
export default useGetMessages;
