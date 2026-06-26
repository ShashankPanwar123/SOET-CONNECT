import api from "./api";
import { getMockUsers, setMockUsers } from "./mockStorage";

const userService = {

  getUsers: async () => {
    try {
      const response = await api.get(
        "/users"
      );
      return response.data;
    } catch (error) {
      console.warn("Backend users API offline. Falling back to local mock users.");
      return getMockUsers();
    }
  },

  createUser: async (
    userData
  ) => {
    try {
      const response = await api.post(
        "/auth/register",
        userData
      );
      return response.data;
    } catch (error) {
      console.warn("Backend register API offline. Adding user to mock storage.");
      const users = getMockUsers();
      if (users.some((u) => u.email === userData.email)) {
        throw new Error("User already exists");
      }
      const newUser = {
        id: String(Date.now()),
        name: userData.name,
        email: userData.email,
        password: userData.password || "default123",
        role: userData.role || "student"
      };
      users.push(newUser);
      setMockUsers(users);
      return newUser;
    }
  },

  updateUser: async (
    id,
    userData
  ) => {
    try {
      const response = await api.put(
        `/users/${id}`,
        userData
      );
      return response.data;
    } catch (error) {
      console.warn("Backend users API offline. Updating mock user.");
      const users = getMockUsers();
      const index = users.findIndex((u) => u.id === String(id));
      if (index !== -1) {
        users[index] = {
          ...users[index],
          name: userData.name,
          email: userData.email,
          role: userData.role
        };
        setMockUsers(users);
        return users[index];
      }
      throw new Error("User not found (offline mode)");
    }
  },

  deleteUser: async (
    id
  ) => {
    try {
      const response = await api.delete(
        `/users/${id}`
      );
      return response.data;
    } catch (error) {
      console.warn("Backend users API offline. Deleting mock user.");
      let users = getMockUsers();
      users = users.filter((u) => u.id !== String(id));
      setMockUsers(users);
      return { message: "User deleted successfully" };
    }
  }

};

export default userService;