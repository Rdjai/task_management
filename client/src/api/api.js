import axios from "axios";

const API_BASE_URL = "https://task-management-tf16.onrender.com/api/v1";

const api = axios.create({
    baseURL: API_BASE_URL,
});

console.log(api);
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const registerUser = (name, email, password) => api.post("/user/register", { name, email, password }, { "Content-Type": "application/json", },);
export const loginUser = (data) => api.post("user/user/login", data);
export const getProfile = () => api.get("/user/user/me");
export const getAllUsers = () => api.get("/admin/search/all");


//task
export const getTask = (data) => api.get("/user/user/mytask", data);
export const getMyTasks = () => api.get("/task/Mytask");
export const getAllTasks = () => api.get("/task/Alltask");
export const createTask = (data) => api.post("/task/create", data,);

export const updateTask = (id, data) => api.put(`/task/${id}`, data);



export const getTaskById = (id) => api.get(`/tasks/${id}`);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);


// users 
export const getUserById = (id) => api.get(`admin/search/single?id=${id}`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);



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
