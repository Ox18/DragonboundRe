import api from "./index";

export const postAjaxLoginService = async (data) => {
    return (await api.post("/ajaxLogin", data)).data;
}