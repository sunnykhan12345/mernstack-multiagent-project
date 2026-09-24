import { graph } from "../graph/graph.js";
import axios from "axios";
export const agent = async (req, res) => {
  try {
    const { prompt, conversitionId } = req.body;
    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversitionId,
      role: "user",
      content,
    });

    const result = await graph.invoke({
      prompt,
      conversationId,
    });
    const response = result.aiResponse;
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({ message: `error is ${err}` });
  }
};
