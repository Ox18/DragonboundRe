export const logoutController = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}