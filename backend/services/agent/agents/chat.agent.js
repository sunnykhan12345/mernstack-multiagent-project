import { getModel } from "../config/llmodels.js";
export const chatAgent = async (state) => {
  const llm = await getModel("chat");
  const systemPrompt =
    "You are a helpful assistant. Treat the conversation history as context for the user's latest message. Remember details the user shared earlier, and answer questions about those details from the history. Do not claim you do not know something when the history contains the answer.";
  const history = (state.history ?? [])
    .filter(
      (message) =>
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string",
    )
    .map((message) => ({
      role: message.role === "user" ? "human" : "assistant",
      content: message.content,
    }));
  const response = await llm.invoke([
    {
      role: "system",
      content: systemPrompt,
    },
    ...history,
    {
      role: "human",
      content: state.prompt,
    },
  ]);
  return {
    ...state,
    aiResponse: response.content.trim(),
  };
};
