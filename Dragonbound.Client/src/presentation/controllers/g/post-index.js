export default async (req, res) => {
    req.session.destroy();
    res.redirect('/');
}