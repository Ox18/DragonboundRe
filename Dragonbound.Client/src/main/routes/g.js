export default (router) => {
    router.post("/g", async (req, res) => {
        req.session.destroy();
        res.redirect('/');
    })
}