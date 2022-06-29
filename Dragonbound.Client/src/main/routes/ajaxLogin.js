import postIndexAjaxLoginController from "../../presentation/controllers/ajaxLogin/post-index"

export default (router) => {
    router.post("/ajaxLogin", postIndexAjaxLoginController);
}