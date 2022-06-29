export default (router) => {
    router.get("/", (req, res) => {
        res.render("pages/index.ejs", { });
    });
}