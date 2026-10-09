import { useEffect, useState } from "react";
import {
  LogOut,
  MessageCircle,
  PanelLeftClose,
  PanelLeftOpen,
  PenBoxIcon,
  Plus,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createConversation } from "../features/createConversition.js";
import { getConversations } from "../features/getConversitions.js";
import {
  addConversation,
  setSelectedConversation,
  setConversations,
} from "../redux/conversitionSlice.js";
import { signOut } from "firebase/auth";
import api from "../utils/axios.js";
import { auth } from "../utils/firebase.js";
export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const { conversations, selectedConversation } = useSelector(
    (state) => state.conversation,
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
      dispatch(setSelectedConversation(conversation));
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
    <div
      className={`fixed inset-y-0 left-0 z-50 h-screen shrink-0 border-r border-white/[0.06] bg-[#0d0f14] text-white transition-[width] duration-200 ease-out lg:static ${
        collapsed ? "w-[76px]" : "w-[270px]"
      }`}
    >
      <div className="flex flex-col h-full">
        <div
          className={`flex h-[65px] items-center border-b border-white/[0.06] ${
            collapsed ? "justify-center px-2" : "gap-2.5 px-4"
          }`}
        >
          <button
            type="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white"
            onClick={() => setCollapsed((value) => !value)}
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
          {!collapsed && (
            <>
              <span className="flex-1 truncate text-base font-semibold tracking-tight text-slate-100">
                Multi Agent
              </span>
              <span className="rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-white">
                free
              </span>
              <button
                type="button"
                onClick={handleCreateConversation}
                aria-label="Create conversation"
                title="Create conversation"
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <PenBoxIcon className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
        <div className={collapsed ? "px-3 pt-4 pb-1" : "px-4 pt-4 pb-1"}>
          <button
            onClick={handleCreateConversation}
            aria-label="New chat"
            title={collapsed ? "New chat" : undefined}
            className={`flex w-full items-center justify-center rounded-lg bg-indigo-500 py-2 text-sm font-medium text-slate-100 transition-colors hover:bg-indigo-400 ${
              collapsed ? "px-2" : "gap-2.5 px-3"
            }`}
          >
            <Plus className="h-4 w-4 shrink-0" />
            {!collapsed && <span>New Chat</span>}
          </button>
        </div>
        <div className="sidebar-scrollbar flex-1 space-y-1 overflow-y-auto px-2 py-2">
          {conversations.map((conversation) => (
            <button
              type="button"
              key={conversation._id}
              onClick={() => dispatch(setSelectedConversation(conversation))}
              aria-pressed={selectedConversation?._id === conversation._id}
              aria-label={conversation.title || "New conversation"}
              title={collapsed ? conversation.title || "New conversation" : undefined}
              className={`flex w-full items-center rounded-lg py-2 text-sm transition-colors ${
                collapsed ? "justify-center px-2" : "gap-2 px-3 text-left"
              } ${
                selectedConversation?._id === conversation._id
                  ? "bg-indigo-500/15 text-indigo-200"
                  : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"
              }`}
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              {!collapsed && (
                <span className="truncate">
                  {conversation.title || "New conversation"}
                </span>
              )}
            </button>
          ))}
        </div>
        <div
          className={`flex items-center border-t border-white/[0.06] py-3 ${
            collapsed ? "justify-center px-2" : "gap-3 px-4"
          }`}
        >
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
          {!collapsed && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};
