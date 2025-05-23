import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

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
      const success = handleInputErrors({
         fullName,
         username,
         password,
         confirmPassword,
         gender,
      });
      if (!success) return;
      setLoading(true);

      try {
         const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               fullName,
               username,
               password,
               confirmPassword,
               gender,
            }),
         });
         const data = await res.json();
         if (data.error) {
            throw new Error(data.error);
         }
         console.log(data);
         localStorage.setItem("chat-user", JSON.stringify(data));

         setAuthUser(data);
         if (data.success) {
            toast.success("User created successfully");
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         toast.error(error.message);
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
   if (!fullName || !username || !password || !confirmPassword || !gender) {
      toast.error("All fields are required");
      return false;
   }
   if (password != confirmPassword) {
      toast.error("Passwords do not match");
      return false;
   }
   return true;
}
