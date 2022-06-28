export default (router) => {
    router.get("/", (req, res) => {
        res.render("pages/index.ejs", { });
    });
    router.get("/s", (req, res)=>{
        res.json([0]);
    })
}