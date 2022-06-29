import api from "./index";

export const postAuthRegisterService = async (data) => {
    return (await api.post("/auth/register", data)).data;
}