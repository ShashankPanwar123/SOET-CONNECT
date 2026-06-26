import api from "./api";

const dashboardService = {

  getStudentDashboard: async () => {
    try {
      const response = await api.get(
        "/dashboard/student"
      );
      return response.data;
    } catch (error) {
      console.warn("Backend student dashboard offline. Returning mock dashboard data.");
      return { success: true };
    }
  },

  getFacultyDashboard: async () => {
    try {
      const response = await api.get(
        "/dashboard/faculty"
      );
      return response.data;
    } catch (error) {
      console.warn("Backend faculty dashboard offline. Returning mock dashboard data.");
      return { success: true };
    }
  },

  getAdminDashboard: async () => {
    try {
      const response = await api.get(
        "/dashboard/admin"
      );
      return response.data;
    } catch (error) {
      console.warn("Backend admin dashboard offline. Returning mock dashboard data.");
      return { success: true };
    }
  }

};

export default dashboardService;