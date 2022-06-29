import indexController from "../../presentation/controllers/index";

export default (router) => {
    router.get("/", indexController);
}