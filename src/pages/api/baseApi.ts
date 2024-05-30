// api/baseApi.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://665424771c6af63f46768ce6.mockapi.io/api/v1",
});

export const getUsers = async () => {
  try {
    const res = await api.get("/users");
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const deleteUser = async (id: string) => {
  try {
    const res = await api.delete(`/users/${id}`);
    return res.status;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

export const createUser = async (userData: {
  name: string;
  age: number;
  isActive: boolean;
}) => {
  try {
    const res = await api.post(`/users/`, userData);
    return res.status;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

export const editUser = async (id: string) => {
  try {
    const res = await api.get(`/users/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

export const updateUser = async (
  id: string,
  userData: { name: string; age: number }
) => {
  try {
    const res = await api.put(`/users/${id}`, userData);
    return res.status;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};
