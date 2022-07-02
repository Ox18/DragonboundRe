import api from "./index";

export const findServerByIdService = async (id) => {
    const response = await api.get(`/online-servers/${id}`);
    return response.data;
}