import { graph } from "../graph/graph.js";
import axios from "axios";
import { addMessage, clearMemory, getMemory } from "../config/memory.js";

export const agent = async (req, res) => {
  let conversationId;
  let shouldClearMemory = false;

  try {
    const { prompt, conversationId: requestConversationId } = req.body;
    conversationId = requestConversationId;
    if (typeof prompt !== "string" || !prompt.trim() || !conversationId) {
      return res
        .status(400)
        .json({ message: "prompt and conversationId are required" });
    }

    const history = await getMemory(conversationId);
    shouldClearMemory = true;

    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "user",
      content: prompt.trim(),
    });
    const currentHistory = await addMessage(
      conversationId,
      "user",
      prompt.trim(),
      history,
    );

    const result = await graph.invoke({
      prompt: prompt.trim(),
      conversationId,
      history,
    });
    const response = result.aiResponse?.trim();
    if (!response) {
      throw new Error("The agent returned an empty response");
    }

    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "assistant",
      content: response,
    });
    await addMessage(
      conversationId,
      "assistant",
      response,
      currentHistory,
    );

    return res.status(200).json(response);
  } catch (err) {
    if (shouldClearMemory) {
      try {
        await clearMemory(conversationId);
      } catch (memoryError) {
        console.error("Unable to clear stale conversation memory:", memoryError);
      }
    }
    console.error("Agent chat request failed:", err);
    return res.status(500).json({ message: "Unable to process chat message" });
  }
};
