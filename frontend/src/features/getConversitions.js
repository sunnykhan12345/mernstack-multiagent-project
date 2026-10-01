import api from "../../src/utils/axios";
export const getConversations = async () => {
  try {
    const { data } = await api.get("/api/chat/get-conversation");
    return data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
};
