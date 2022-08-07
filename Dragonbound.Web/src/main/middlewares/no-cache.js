export default (_req, res, next) => {
    res.set(
        "cache-control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.set("pragma", "no-cache");
    res.set("expires", "0");
    res.set("surrogate-control", "no-store");
    next();
};