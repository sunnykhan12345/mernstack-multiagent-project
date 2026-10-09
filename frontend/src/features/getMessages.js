import api from "../utils/axios";
const getMessages = async (conversationId) => {
  const { data } = await api.get(`/api/chat/get-messages/${conversationId}`);
  return data;
};

export default getMessages;
