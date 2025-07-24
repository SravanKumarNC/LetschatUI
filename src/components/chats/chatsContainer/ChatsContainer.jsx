import ChatsContainerHeader from "./ChatsContainerHeader";
import ChatsContainerSearch from "./ChatsContainerSearch";
import ChatsList from "./ChatsList";

const ChatsContainer = () => {
  return (
    <div
      className="chats-container h-full flex flex-col"
      style={{
        boxShadow: "4px 0 8px -2px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Header */}
      <ChatsContainerHeader />

      {/* Search Bar */}
      <ChatsContainerSearch />

      {/* Chat List */}
      <ChatsList />
    </div>
  );
};

export default ChatsContainer;
