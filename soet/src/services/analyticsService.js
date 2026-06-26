import api from "./api";
import { getMockUsers, getMockNotices } from "./mockStorage";

const analyticsService = {

  getAnalytics: async () => {
    try {
      const response = await api.get(
        "/analytics"
      );
      return response.data;
    } catch (error) {
      console.warn("Backend analytics API offline. Computing mock counts.");
      const users = getMockUsers();
      const notices = getMockNotices();

      return {
        total_students: users.filter((u) => u.role === "student").length,
        total_faculty: users.filter((u) => u.role === "faculty").length,
        total_notices: notices.length
      };
    }
  },

  getNoticeStats: async () => {
    try {
      const response = await api.get(
        "/analytics/notices"
      );
      return response.data;
    } catch (error) {
      console.warn("Backend notice analytics offline. Computing mock stats.");
      const notices = getMockNotices();
      const categories = ["Exam", "Placement", "Event", "Academic"];
      const stats = {};
      categories.forEach((cat) => {
        stats[cat] = notices.filter((n) => n.category.toLowerCase() === cat.toLowerCase()).length;
      });
      return stats;
    }
  },

  getUserStats: async () => {
    try {
      const response = await api.get(
        "/analytics/users"
      );
      return response.data;
    } catch (error) {
      console.warn("Backend user analytics offline. Computing mock stats.");
      const users = getMockUsers();
      return {
        student: users.filter((u) => u.role === "student").length,
        faculty: users.filter((u) => u.role === "faculty").length,
        admin: users.filter((u) => u.role === "admin").length
      };
    }
  }

};

export default analyticsService;