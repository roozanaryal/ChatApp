import useSignup from "../../hooks/useSignup";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
// import { Link } from "react-router-dom";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useSignup();

  const handleGenderChange = (gender) => {
    setInputs({ ...inputs, gender });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await signup(inputs);
  };
  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* Glass effect container */}
      <div className="backdrop-blur-md bg-black/30 p-5 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.37)] border border-white/10">
        {/* Header */}
        <div className="text-center mb-3">
          <h1 className="text-2xl font-bold text-white drop-shadow-lg tracking-wide">
            Create Account
          </h1>
          <p className="text-gray-300 text-xs">Join the conversation today</p>
        </div>

        {/* Signup Form */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div>
            <label className="block text-gray-300 text-xs font-medium mb-1 drop-shadow">
              Full Name
            </label>
            <input
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
              type="text"
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all text-sm"
              placeholder="Enter your full name"
            />
          </div>

          {/* Username Input */}
          <div>
            <label className="block text-gray-300 text-xs font-medium mb-1 drop-shadow">
              Username
            </label>
            <input
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              type="text"
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all text-sm"
              placeholder="Choose a username"
            />
          </div>

          {/* Gender Selection */}
          <GenderCheckbox onGenderChange={handleGenderChange} selectedGender={inputs.gender}/>

          {/* Password Input */}
          <div>
            <label className="block text-gray-300 text-xs font-medium mb-1 drop-shadow">
              Password
            </label>
            <input
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              type="password"
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all text-sm"
              placeholder="Create a password"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-gray-300 text-xs font-medium mb-1 drop-shadow">
              Confirm Password
            </label>
            <input
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
              type="password"
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all text-sm"
              placeholder="Confirm your password"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-2.5 mt-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-xl hover:from-purple-700 hover:to-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black/40 transition-all duration-200 font-medium shadow-xl hover:shadow-purple-500/25 text-sm"
          >
            Create Account
          </button>

          {/* Login Link */}
          <div className="text-center mt-1.5">
            <p className="text-gray-400 text-xs">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
