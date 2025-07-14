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
        const res = await fetch(`${baseUrl}/api/user`, {
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
        setUsers(filteredUsers);
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