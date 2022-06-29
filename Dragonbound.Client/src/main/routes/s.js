import getIndexController from "../../presentation/controllers/s/get-index";

export default (router) => {
    router.get("/s", getIndexController);
}