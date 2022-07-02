import postIndexAjaxLoginController from "../../presentation/controllers/ajaxLogin/post-index"

export default (router) => {
    router.post("/ajaxLogin", postIndexAjaxLoginController);

    router.get("/api/get_status", (req, res) => {
        res.json([
            1,
            0,
            0
        ])
    })
}