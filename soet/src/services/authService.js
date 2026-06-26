import api from "./api";
import { getMockUsers, setMockUsers } from "./mockStorage";

const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post(
        "/auth/login",
        credentials
      );

      return response.data;
    } catch (error) {
      console.warn("Backend auth offline. Falling back to local mock login.");
      const users = getMockUsers();
      const match = users.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );

      if (match) {
        return {
          token: "mock-session-token-123456",
          user: {
            id: match.id,
            name: match.name,
            email: match.email,
            role: match.role
          }
        };
      }
      throw new Error(error.response?.data?.detail || "Invalid email or password (offline mode)");
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post(
        "/auth/register",
        userData
      );

      return response.data;
    } catch (error) {
      console.warn("Backend register offline. Falling back to local mock registration.");
      const users = getMockUsers();
      if (users.some((u) => u.email === userData.email)) {
        throw new Error("Email already registered (offline mode)");
      }
      const newUser = {
        id: String(users.length + 1),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role
      };
      users.push(newUser);
      setMockUsers(users);
      return { message: "User registered successfully", user: newUser };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  getCurrentUser: () => {
    const user =
      localStorage.getItem("user");

    return user
      ? JSON.parse(user)
      : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(
      "token"
    );
  },
};

export default authService;