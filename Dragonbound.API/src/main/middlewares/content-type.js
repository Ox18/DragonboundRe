export default (_req, res, next) => {
    res.type("json");
    next();
};
