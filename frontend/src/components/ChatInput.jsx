import { useState } from "react";
import { Paperclip, Send, Smile, Mic, Plus } from "lucide-react";

const ChatInput = ({ onSend, disabled = false }) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = message.trim();
    if (!content || isSending || disabled) return;

    setIsSending(true);
    setError("");
    try {
      await onSend(content);
      setMessage("");
    } catch (sendError) {
      console.error("Error sending message:", sendError);
      setError(
        sendError.response?.data?.message ||
          sendError.message ||
          "Unable to send message.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="w-full border-t border-white/[0.06] bg-[#0d0f14]/95 px-3 py-4 backdrop-blur md:px-5">
      <div className="mx-auto max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/[0.09] bg-[#151820] p-2 shadow-xl shadow-black/20 transition-all duration-200 focus-within:border-indigo-400/40 focus-within:ring-4 focus-within:ring-indigo-500/[0.08]"
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder={
              disabled
                ? "Select or create a chat first..."
                : "Message your assistant..."
            }
            disabled={disabled || isSending}
            rows={2}
            className="max-h-40 min-h-[52px] w-full resize-none bg-transparent px-3 py-3 text-sm leading-6 text-white outline-none placeholder:text-gray-500 disabled:cursor-not-allowed"
          />

          <div className="flex items-center justify-between gap-2 px-1 pb-1">
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Add attachment"
                className="rounded-xl p-2.5 text-gray-400 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed"
              >
                <Plus size={19} />
              </button>

              <button
                type="button"
                aria-label="Attach file"
                className="rounded-xl p-2.5 text-gray-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                <Paperclip size={18} />
              </button>

              <button
                type="button"
                aria-label="Add emoji"
                className="hidden rounded-xl p-2.5 text-gray-400 transition hover:bg-white/[0.06] hover:text-white sm:block"
              >
                <Smile size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden text-[11px] text-gray-500 sm:block">
                Enter to send · Shift + Enter for new line
              </span>

              <button
                type="button"
                aria-label="Voice input"
                className="rounded-xl p-2.5 text-gray-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                <Mic size={18} />
              </button>

              <button
                type="submit"
                disabled={disabled || isSending || !message.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-indigo-400 active:scale-95 disabled:cursor-not-allowed disabled:bg-white/[0.06] disabled:text-gray-600 disabled:shadow-none"
              >
                <Send size={17} />
              </button>
            </div>
          </div>
        </form>

        {error && (
          <p role="alert" className="mt-2 text-center text-xs text-red-400">
            {error}
          </p>
        )}

        <p className="mt-2 text-center text-[11px] text-gray-600">
          AI can make mistakes. Check important information.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
