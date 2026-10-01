import { useEffect, useState } from "react";
import { PanelLeftIcon, PenBoxIcon, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createConversation } from "../features/createConversition.js";
import { getConversations } from "../features/getConversitions.js";
import {
  addConversation,
  setConversations,
} from "../redux/conversitionSlice.js";
export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const conversations = useSelector(
    (state) => state.conversation.conversations,
  );

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const conversations = await getConversations();
        dispatch(setConversations(conversations));
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    if (userData) {
      fetchConversations();
    }
  }, [dispatch, userData]);

  const handleCreateConversation = async () => {
    try {
      const conversation = await createConversation();
      dispatch(addConversation(conversation));
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  return (
    <div className="fixed lg:static inset-y-0 left-0 z-50 w-[270px] h-screen shrink-0 bg-[#0d0f14] border-r border-white/[0.06] text-white">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/[0.06]">
          <div
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.06] cursor-pointer transition-colors bg-transparent border-none"
            onClick={() => setCollapsed(!collapsed)}
          >
            <PanelLeftIcon />
          </div>
          <span className="text-base font-semibold text-slate-100 tracking-tight flex-1">
            Multi Agent
          </span>
          <span className="text-xs font-medium bg-blue-500 text-white px-2 py-1 rounded-full">
            free
          </span>
          <button onClick={handleCreateConversation}>
            <PenBoxIcon className="w-4 h-4 text-slate-500 hover:text-slate-200 transition-colors" />
          </button>
        </div>
        {/* chat blus button */}
        <div className="px-4 pt-4 pb-1">
          <button
            onClick={handleCreateConversation}
            className="w-full flex items-center justify-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-100 bg-indigo-500 hover:bg-white/[0.06] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>
        {/* conversation list  */}
        <div className="flex-1 overflow-y-auto px-3 py-2">
          {conversations.map((conversation) => (
            <div
              key={conversation._id}
              className="truncate rounded-md px-3 py-2 text-sm text-slate-400"
              title={conversation.title || "New conversation"}
            >
              {conversation.title || "New conversation"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
