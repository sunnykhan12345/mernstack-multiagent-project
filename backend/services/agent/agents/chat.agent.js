import { getModel } from "../config/llmodels.js";
export const chatAgent = async (state) => {
  const llm = await getModel("chat");
  const systemPrompt = `You are a helpful assistant. You will be given a prompt and you need to generate a response based on the prompt. The prompt is: ${state.prompt}
    `;
  const response = await llm.invoke([
    {
      role: "system",
      content: systemPrompt,
    },
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
