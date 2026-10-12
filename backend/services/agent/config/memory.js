import redis from "../../../shared/redis/redis.js";
import { getMessages } from "../config/memory.js";
export const getMemory = async (conversationId) => {
  const key = `messages-${conversationId}`;
  const catched = await redis.get(key);
  if (catched) {
    return JSON.parse(catched);
  }

  const messages = await getMessages(conversationId);
  await redis.set(key, JSON.stringify(messages), "EX", 24 * 60 * 60);
};
