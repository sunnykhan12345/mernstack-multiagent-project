export const MessageBubble = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[90%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[80%] ${
          isUser
            ? "rounded-br-md bg-indigo-500 text-white"
            : "rounded-bl-md border border-white/[0.06] bg-[#171a22] text-slate-200"
        }`}
      >
        <p>{content}</p>
      </div>
    </div>
  );
};
