import Message from "./Message";

const Messages = ({ messages = [], loading }) => {
  if (loading) {
    return <div className="text-center text-gray-400">Loading messages...</div>;
  }

  if (messages.length === 0) {
    return <NoChatSelected />;
  }

  return (
    <div className="flex flex-col space-y-4">
      {messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </div>
  );
};

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center p-6 max-w-sm mx-auto">
        <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-1">No conversation selected</h3>
        <p className="text-gray-400 mb-4">Choose a conversation from the sidebar to start chatting</p>
      </div>
    </div>
  );
};

export default Messages;
