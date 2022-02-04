export const post = (req, res) => {
    const { 
        u, // username ✅
        p, // password ✅
        r  // remember ??
    } = req.body;
    res.send("1");
}