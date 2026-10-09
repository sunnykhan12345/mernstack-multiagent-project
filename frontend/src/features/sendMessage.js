import api from "../utils/axios";
const sendMessage = async (payload) => {
  const { data } = await api.post("/api/agent/chat", payload);
  return data;
};

export default sendMessage;
