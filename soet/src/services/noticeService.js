import api from "./api";
import { getMockNotices, setMockNotices, mockClassify } from "./mockStorage";

const noticeService = {

  getNotices: async (
    search = "",
    category = "",
    page = 1
  ) => {
    try {
      const response = await api.get(
        "/notices",
        {
          params: {
            search,
            category,
            page
          }
        }
      );
      return response.data;
    } catch (error) {
      console.warn("Backend notices API offline. Falling back to local mock notices.");
      let list = getMockNotices();

      if (category && category !== "All") {
        list = list.filter((n) => n.category.toLowerCase() === category.toLowerCase());
      }

      if (search) {
        const query = search.toLowerCase();
        list = list.filter(
          (n) =>
            n.title.toLowerCase().includes(query) ||
            n.content.toLowerCase().includes(query)
        );
      }

      // Sort newest first by default in offline fallback
      list.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

      return list;
    }
  },

  getNoticeById: async (id) => {
    try {
      const response = await api.get(
        `/notices/${id}`
      );
      return response.data;
    } catch (error) {
      console.warn("Backend notices API offline. Finding mock notice.");
      const list = getMockNotices();
      const match = list.find((n) => n.id === String(id));
      if (match) return match;
      throw new Error("Notice not found (offline mode)");
    }
  },

  createNotice: async (
    noticeData
  ) => {
    try {
      const response = await api.post(
        "/notices",
        noticeData
      );
      return response.data;
    } catch (error) {
      console.warn("Backend notices API offline. Creating mock notice.");
      const list = getMockNotices();
      const storedUser = localStorage.getItem("user");
      const currentUser = storedUser ? JSON.parse(storedUser) : null;

      const newNotice = {
        id: String(Date.now()),
        title: noticeData.title,
        content: noticeData.content,
        category: noticeData.category || "Academic",
        created_by: currentUser?.email || "faculty@soet.com",
        created_by_name: currentUser?.name || "Dr. Alok Kumar",
        created_at: new Date().toISOString()
      };

      list.push(newNotice);
      setMockNotices(list);
      return newNotice;
    }
  },

  updateNotice: async (
    id,
    noticeData
  ) => {
    try {
      const response = await api.put(
        `/notices/${id}`,
        noticeData
      );
      return response.data;
    } catch (error) {
      console.warn("Backend notices API offline. Updating mock notice.");
      const list = getMockNotices();
      const index = list.findIndex((n) => n.id === String(id));

      if (index !== -1) {
        list[index] = {
          ...list[index],
          title: noticeData.title,
          content: noticeData.content,
          category: noticeData.category
        };
        setMockNotices(list);
        return list[index];
      }
      throw new Error("Notice not found (offline mode)");
    }
  },

  deleteNotice: async (id) => {
    try {
      const response = await api.delete(
        `/notices/${id}`
      );
      return response.data;
    } catch (error) {
      console.warn("Backend notices API offline. Deleting mock notice.");
      let list = getMockNotices();
      list = list.filter((n) => n.id !== String(id));
      setMockNotices(list);
      return { message: "Notice deleted successfully" };
    }
  },

  classifyNotice: async (
    content
  ) => {
    try {
      const response = await api.post(
        "/notices/classify",
        {
          content
        }
      );
      return response.data;
    } catch (error) {
      console.warn("Backend ML API offline. Using client-side keyword matching classifier.");
      const category = mockClassify(content);
      return { category };
    }
  }

};

export default noticeService;