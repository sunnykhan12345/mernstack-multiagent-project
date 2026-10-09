import { MessageBubble } from "./messageBubble";
import { useSelector } from "react-redux";
const MessageList = () => {
  const { messages } = useSelector((state) => state.message);
  return (
    <div className="chat-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col space-y-5">
        {messages?.length > 0 ? (
          messages.map((msg, index) => (
            <div key={msg._id || `${msg.role}-${index}`}>
              <MessageBubble role={msg.role} content={msg.content} />
            </div>
          ))
        ) : (
          <div className="flex min-h-full flex-col items-center justify-center gap-2 text-center text-sm text-white">
            <h1 className="text-base font-medium text-gray-300">
              Who can help you?
            </h1>
            <h2 className="max-w-md text-sm font-normal text-gray-500">
              Ask anything: get ideas, review code, or work through a bug.
            </h2>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {[
                "Build a Netflix clone",
                "Review my code",
                "Help me debug",
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs text-white/60 transition-colors hover:border-indigo-400/30 hover:bg-indigo-400/10 hover:text-white"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;
