import { useCallback, useEffect } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import Nav from "./Nav";
import { useDispatch, useSelector } from "react-redux";
import getMessages from "../features/getMessages";
import sendMessage from "../features/sendMessage";
import { addMessage, setMessages } from "../redux/messageSlice";

export const ChatArea = () => {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const dispatch = useDispatch();

  useEffect(() => {
    let cancelled = false;
    dispatch(setMessages([]));

    if (!selectedConversation?._id) {
      return () => {
        cancelled = true;
      };
    }

    const loadMessages = async () => {
      try {
        const messages = await getMessages(selectedConversation._id);
        if (!cancelled) {
          dispatch(setMessages(messages.reverse()));
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    loadMessages();
    return () => {
      cancelled = true;
    };
  }, [dispatch, selectedConversation?._id]);

  const handleSend = useCallback(
    async (prompt) => {
      if (!selectedConversation?._id) {
        throw new Error("Select or create a chat before sending a message.");
      }

      const response = await sendMessage({
        conversationId: selectedConversation._id,
        prompt,
      });
      const content =
        typeof response === "string"
          ? response
          : response?.content ?? response?.response;

      if (typeof content !== "string" || !content.trim()) {
        throw new Error("The assistant returned an empty response.");
      }

      dispatch(addMessage({ role: "user", content: prompt }));
      dispatch(addMessage({ role: "assistant", content }));
    },
    [dispatch, selectedConversation],
  );

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col text-white">
      <Nav />
      <MessageList />
      <ChatInput onSend={handleSend} disabled={!selectedConversation?._id} />
    </div>
  );
};
