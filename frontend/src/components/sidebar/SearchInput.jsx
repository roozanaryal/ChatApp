import React, { useState } from "react";
import { toast } from "react-hot-toast";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    if (search.length < 3) {
      return toast.error("Search must be at least 3 characters long");
    }
    const conversation = conversations.find((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No Such user found");
    }
  };
  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        placeholder="Search messages..."
        className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm transition-all text-sm pr-10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchInput;
