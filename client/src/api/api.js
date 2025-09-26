import axios from "axios";

const API_BASE_URL = "https://task-management-tf16.onrender.com/api/v1";

const api = axios.create({
    baseURL: API_BASE_URL,


});


export const registerUser = (name, email, password) => api.post("/user/register", { name, email, password },
    {
        "Content-Type": "application/json",
    },
);

export const loginUser = (data) => api.post("/auth/login", data);
export const getProfile = () => api.get("/auth/profile");

export const getAllUsers = () => api.get("/admin/search/all");
export const getUserById = (id) => api.get(`/users/${id}`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

export const getAllTasks = () => api.get("/tasks");
export const getTaskById = (id) => api.get(`/tasks/${id}`);
export const createTask = (data) => api.post("/tasks", data);
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export const getReports = () => api.get("/reports");

export const getNotifications = () => api.get("/notifications");

export const getDocuments = () => api.get("/documents");
export const uploadDocument = (formData) =>
    api.post("/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

export const getSettings = () => api.get("/settings");
export const updateSettings = (data) => api.put("/settings", data);

export default api;
