import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* Glass effect container */}
      <div className="backdrop-blur-md bg-black/30 p-5 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.37)] border border-white/10">
        {/* Header */}
        <div className="text-center mb-3">
          <h1 className="text-2xl font-bold text-white drop-shadow-lg tracking-wide">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-xs">Sign in to continue chatting</p>
        </div>

        {/* Login Form */}
        <form className="space-y-3">
          {/* Username Input */}
          <div>
            <label className="block text-gray-300 text-xs font-medium mb-1 drop-shadow">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all text-sm"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-300 text-xs font-medium mb-1 drop-shadow">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all text-sm"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            onClick={() => login(username, password)}
            disabled={loading}
            className={`w-full py-2.5 mt-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-black/40 transition-all duration-200 font-medium shadow-xl ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:from-purple-700 hover:to-fuchsia-700 hover:shadow-purple-500/25"
            } text-sm flex items-center justify-center gap-2`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Signup Link */}
          <div className="text-center mt-1.5">
            <p className="text-gray-400 text-xs">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
