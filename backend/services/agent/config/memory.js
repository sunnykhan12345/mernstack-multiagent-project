import redis from "../../../shared/redis/redis.js";
import { getMessages } from "../utils/getMessages.js";

const MEMORY_TTL_SECONDS = 24 * 60 * 60;
const getMemoryKey = (conversationId) => `messages-v2-${conversationId}`;

export const getMemory = async (conversationId) => {
  const key = getMemoryKey(conversationId);
  const cached = await redis.get(key);

  if (cached !== null) {
    return JSON.parse(cached);
  }

  const messages = await getMessages(conversationId);
  if (!Array.isArray(messages)) {
    throw new TypeError("Conversation messages must be an array");
  }

  const chronologicalMessages = messages.slice().reverse();
  await redis.set(
    key,
    JSON.stringify(chronologicalMessages),
    "EX",
    MEMORY_TTL_SECONDS,
  );
  return chronologicalMessages;
};

export const setMemory = async (conversationId, messages) => {
  await redis.set(
    getMemoryKey(conversationId),
    JSON.stringify(messages),
    "EX",
    MEMORY_TTL_SECONDS,
  );
};

export const addMessage = async (
  conversationId,
  role,
  content,
  currentMessages,
) => {
  const messages = currentMessages ?? (await getMemory(conversationId));
  const updatedMessages = [...messages, { role, content }];
  await setMemory(conversationId, updatedMessages);
  return updatedMessages;
};

export const clearMemory = async (conversationId) => {
  await redis.del(getMemoryKey(conversationId));
};
