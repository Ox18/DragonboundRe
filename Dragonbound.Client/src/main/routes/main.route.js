export default (router) => {
    router.get("/", (req, res) => {
        res.send("Bye world!")
    })
}