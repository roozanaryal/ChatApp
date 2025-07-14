import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
export const baseUrl="http://localhost:5000"
const useSignup = () => {
   const [loading, setLoading] = useState(false);
   const { setAuthUser } = useAuthContext();
   const signup = async ({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
   }) => {
      setLoading(true);
      try {
         // All validation is now handled by handleInputErrors, which throws on failure
         handleInputErrors({
            fullName,
            username,
            password,
            confirmPassword,
            gender,
         });

         // Make the API request
         const res = await fetch(`${baseUrl}/api/auth/signup`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               ...(localStorage.getItem("chat-token") ? { "Authorization": `Bearer ${localStorage.getItem("chat-token")}` } : {})
            },
            body: JSON.stringify({
               fullName: fullName.trim(),
               username: username.trim().toLowerCase(),
               password,
               confirmPassword,
               gender,
            }),
            credentials: "include",
         });

         const data = await res.json();

         if (!res.ok) {
            throw new Error(data.error || 'Registration failed. Please try again.');
         }

         if (!data || !data._id) {
            throw new Error('Invalid response from server');
         }

         // Store token separately if present
         if (data.token) {
           localStorage.setItem("chat-token", data.token);
         }
         localStorage.setItem("chat-user", JSON.stringify(data));
         setAuthUser(data);

         toast.success("Account created successfully!");

         return data;
      } catch (error) {
         toast.error(error.message || 'An error occurred during registration');
      } finally {
         setLoading(false);
      }
   };
   return { signup, loading };
};

export default useSignup;

function handleInputErrors({
   fullName,
   username,
   password,
   confirmPassword,
   gender,
}) {
   if (!fullName?.trim() || !username?.trim() || !password || !confirmPassword || !gender) {
      throw new Error("All fields are required");
   }

   if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
   }

   if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
   }

   if (username.length < 3) {
      throw new Error("Username must be at least 3 characters long");
   }

   if (fullName.trim().length < 2) {
      throw new Error("Please enter a valid full name");
   }
}