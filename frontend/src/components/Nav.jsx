import { useSelector } from "react-redux";
import { MessageSquare } from "lucide-react";
const Nav = () => {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const { messages } = useSelector((state) => state.message);
  return (
    <>
      {selectedConversation && (
        <div className="h-15 flex items-center gap-2.5  px-5 border-b border-white/[0.06] bg-[#0d0f14]">
          <div>
            <MessageSquare size={13} className="text-white" />
          </div>
          <div className="text-sm">
            {selectedConversation.title || "New Chat"}
          </div>
          <div className="mr-1.5 text-xs text-white/50 bg-gray-800 px-2 py-1 rounded-md">
            {messages.length} Messages
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
