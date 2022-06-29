import api from "./index";

export const getAuthLoginService = async (data) => {
    return (await api.post("/auth/login", data)).data;
}