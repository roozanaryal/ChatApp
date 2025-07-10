import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { baseUrl } from "./useSignup";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    setLoading(true);

    try {
      // Input validation
      if (!username.trim() || !password) {
        throw new Error("Please fill in all fields");
      }

      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      // Check if the response was not ok (status code not in the range 200-299)
      if (!res.ok) {
        throw new Error(
          data.error || "Login failed. Please check your credentials."
        );
      }

      // Verify that we received the expected user data
      if (!data || !data._id) {
        throw new Error("Invalid response from server");
      }

      // Store user data in localStorage and context
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);

      // Show success message
      toast.success("Successfully logged in!");

      // Return the user data in case it's needed
      return data;
    } catch (error) {
      // Log the error for debugging
      console.error("Login error:", error);
      // Show user-friendly error message
      toast.error(error.message || "An error occurred during login");
      // Re-throw the error so the component can handle it if needed
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;
