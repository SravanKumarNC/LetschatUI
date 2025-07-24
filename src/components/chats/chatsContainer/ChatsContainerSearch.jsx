import React, { useEffect, useState } from "react";
import { getSingleChat, searchChats } from "../../../services/apiServices";
import { ChatState } from "../../../context/ChatProvider";
import ProfileDp from "../../ProfileDp";
import { IoAdd, IoSearchOutline } from "react-icons/io5";

const ChatsContainerSearch = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { user, chats, setChats, setSelectedChat } = ChatState();
  const accessChat = async (userId) => {
    try {
      const data = await getSingleChat(userId, user.token);
      if (!chats.find((chat) => chat._id === data._id)) {
        setChats((prev) => [data, ...prev]);
      }
      setSelectedChat(data);
      setSearch("");
      setSearchResults([]);
    } catch (error) {
      console.error("Faild to access chat", error);
    }
  };
  useEffect(() => {
    const debounse = setTimeout(async () => {
      if (!search.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const data = await searchChats(search, user.token);
        setSearchResults(data);
      } catch (error) {
        console.error("Search error :", error);
      }
    }, 500);
    return () => clearTimeout(debounse);
  }, [search, user?.token]);
  return (
    <div className="px-4 py-2">
      <div className="flex items-center border-b-2 border-green-500 bg-neutral-800 rounded px-2 py-1">
        <IoSearchOutline className="text-green-500 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search or start new chat"
          className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
          {searchResults.map((u) => (
            <div
              key={u._id}
              className="flex items-center justify-between p-2 bg-neutral-700 rounded cursor-pointer hover:bg-gray-700"
              onClick={() => accessChat(u._id)}
            >
              <div className="flex items-center space-x-2">
                <div>
                  <ProfileDp name={u?.name} />
                </div>
                <div>
                  <p className="text-white font-medium">{u.name}</p>
                  <p className="text-gray-400 text-sm">{u.email}</p>
                </div>
              </div>

              <IoAdd className="w-6 h-6 cursor-pointer" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatsContainerSearch;
