module.exports = function (req, res, next) {
    if (req.session.account_id) {
        try {
            next();
        } catch (e) {
            res.status(403);
        }
    } else {
        res.redirect('/login');
    }
};