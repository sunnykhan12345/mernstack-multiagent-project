import { graph } from "../graph/graph.js";
import axios from "axios";
export const agent = async (req, res) => {
  try {
    const { prompt, conversationId } = req.body;
    if (typeof prompt !== "string" || !prompt.trim() || !conversationId) {
      return res
        .status(400)
        .json({ message: "prompt and conversationId are required" });
    }

    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "user",
      content: prompt.trim(),
    });

    const result = await graph.invoke({
      prompt: prompt.trim(),
      conversationId,
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

    return res.status(200).json(response);
  } catch (err) {
    console.error("Agent chat request failed:", err);
    return res.status(500).json({ message: "Unable to process chat message" });
  }
};
