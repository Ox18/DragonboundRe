import postIndexAjaxRegisterController from "../../presentation/controllers/ajaxRegister/post-index";

export default (router) => {
    router.post("/ajaxRegister", postIndexAjaxRegisterController);
}