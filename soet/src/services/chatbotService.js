import api from "./api";
import { mockChatReply } from "./mockStorage";

const chatbotService = {

  askQuestion: async (
    message
  ) => {
    try {
      const response = await api.post(
        "/chatbot",
        {
          query: message
        }
      );

      return response.data;
    } catch (error) {
      console.warn("Backend chatbot API offline. Using client-side response.");
      const reply = mockChatReply(message);
      // Return expected backend chatbot response structure
      return { response: reply };
    }
  }

};

export default chatbotService;