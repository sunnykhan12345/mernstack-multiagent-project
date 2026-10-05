import { useEffect, useState } from "react";
import {
  LogOut,
  MessageCircle,
  PanelLeftIcon,
  PenBoxIcon,
  Plus,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createConversation } from "../features/createConversition.js";
import { getConversations } from "../features/getConversitions.js";
import {
  addConversation,
  setConversations,
} from "../redux/conversitionSlice.js";
import { signOut } from "firebase/auth";
import api from "../utils/axios.js";
import { auth } from "../utils/firebase.js";
export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
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
      setSelectedConversationId(conversation._id);
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await api.get("/api/logout");
    } catch (error) {
      console.error("Error ending logout session:", error);
    }

    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
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
            <button
              type="button"
              key={conversation._id}
              onClick={() => setSelectedConversationId(conversation._id)}
              aria-pressed={selectedConversationId === conversation._id}
              className={`flex w-full gap-2 items-center truncate rounded-md px-3 py-2 text-left text-sm transition-colors ${
                selectedConversationId === conversation._id
                  ? "bg-white/[0.08] text-slate-100"
                  : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"
              }`}
              title={conversation.title || "New conversation"}
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span className="truncate">
                {conversation.title || "New conversation"}
              </span>
            </button>
          ))}
        </div>
        {/* bottom user getting */}
        <div className="flex items-center gap-3 border-t border-white/[0.06] px-4 py-3">
          {userData?.avator ? (
            <img
              src={userData.avator}
              alt=""
              className="h-9 w-9 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white"
            >
              {(userData?.name || userData?.email || "U")
                .charAt(0)
                .toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-100">
              {userData?.name || "User"}
            </p>
            {userData?.email && (
              <p className="truncate text-xs text-slate-500">
                {userData.email}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Log out"
            title="Log out"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
