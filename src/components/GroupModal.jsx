import React, { useState, useEffect } from "react";
import { IoAdd, IoSearchOutline } from "react-icons/io5";
import { HiUserCircle } from "react-icons/hi2";
import { ChatState } from "../context/ChatProvider";
import { createGroupChat, searchChats } from "../services/apiServices";
import ProfileDp from "./ProfileDp";

const GroupModal = ({ onClose }) => {
  const { user } = ChatState();

  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Handle search
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!search.trim()) {
        setSearchResults([]);
        return;
      }
      // try {
      //   const { data } = await axios.get(
      //     `http://192.168.1.8:5000/api/user?search=${search}`,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${user?.token}`,
      //       },
      //     }
      //   );
      //   setSearchResults(data);
      // } catch (err) {
      //   console.error("User search error", err);
      // }
      try {
        const data = await searchChats(search, user.token);
        setSearchResults(data);
      } catch (error) {
        console.error("Search error :", error);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, user?.token]);

  const handleAddUser = (userToAdd) => {
    if (selectedUsers.find((u) => u._id === userToAdd._id)) {
      setSearchResults([]);
      setSearch("");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
    setSearchResults([]);
    setSearch("");
  };

  const handleRemoveUser = (userToRemove) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== userToRemove._id));
  };

  const handleSubmit = async () => {
    if (!groupName || selectedUsers.length === 0) {
      alert("Group name and members are required!");
      return;
    }
    try {
      const name = groupName;
      const users = JSON.stringify(selectedUsers.map((u) => u._id));
      const  response  = await createGroupChat(name, users, user.token);
      console.log(response);
      // Clear after successful creation
      setGroupName("");
      setSearch("");
      setSelectedUsers([]);
      onClose(); // Close the modal
    } catch (error) {
      console.error("Failed to create group", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-neutral-900 w-full max-w-lg p-6 rounded-lg space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-xl text-white font-semibold">Create Group</h2>

        <input
          type="text"
          placeholder="Group Name"
          className="w-full px-4 py-2 bg-neutral-800 rounded text-white placeholder-gray-400 outline-none"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

        <div className="flex items-center border-b-2 border-green-500 bg-neutral-800 rounded px-2 py-1">
          <IoSearchOutline className="text-green-500 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search users to add"
            className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Search Results */}
        {/* {searchResults.length > 0 && (
          <div className="mt-2 max-h-40 overflow-y-auto space-y-2">
            {searchResults.map((u) => (
              <div
                key={u._id}
                className="flex items-center space-x-3 p-2 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
                onClick={() => handleAddUser(u)}
              >
                <HiUserCircle className="w-8 h-8 text-gray-500" />
                <div>
                  <p className="text-white font-medium">{u.name}</p>
                  <p className="text-gray-400 text-sm">{u.email}</p>
                </div>
              </div>
            ))}
          </div>
        )} */}
        {searchResults.length > 0 && (
          <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
            {searchResults.map((u) => (
              <div
                key={u._id}
                className="flex items-center justify-between p-2 bg-neutral-700 rounded cursor-pointer hover:bg-gray-700"
                onClick={() => handleAddUser(u)}
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

        {/* Selected Users */}
        <div className="flex flex-wrap gap-2">
          {selectedUsers.map((u) => (
            <div
              key={u._id}
              className="flex items-center bg-green-600 text-white px-3 py-1 rounded-full text-sm"
            >
              {u.name}
              <span
                onClick={() => handleRemoveUser(u)}
                className="ml-2 cursor-pointer"
              >
                ✕
              </span>
            </div>
          ))}
        </div>

        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
          onClick={handleSubmit}
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

export default GroupModal;
