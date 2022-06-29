import postIndexController from "../../presentation/controllers/g/post-index";

export default (router) => {
    router.post("/g", postIndexController);
}