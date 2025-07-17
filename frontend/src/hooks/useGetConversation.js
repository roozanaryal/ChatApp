import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "./useSignup";
import useConversation from "../zustand/useConversation";

export default function useGetConversation() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { authUser } = useConversation();

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/api/users/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("chat-token")}`
          }
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        // Filter out the current user
        const filteredUsers = data.filter(
          (user) => user._id !== authUser?._id && user.username !== authUser?.username
        );

        // Fetch last message for each user in parallel
        const usersWithLastMessage = await Promise.all(filteredUsers.map(async (user) => {
          try {
            const res = await fetch(`${baseUrl}/api/messages/last/${user._id}` , {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("chat-token")}`
              }
            });
            const msgData = await res.json();
            if (msgData && msgData.message) {
              return {
                ...user,
                lastMessage: msgData.message.message,
                lastMessageTime: msgData.message.createdAt
              };
            } else {
              return user;
            }
          } catch {
            return user;
          }
        }));
        setUsers(usersWithLastMessage);
      } catch (error) {
        toast(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (authUser) getUsers();
  }, [authUser]);
  return { loading, users };
}