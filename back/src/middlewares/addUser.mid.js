function addUser(req, res, next) {
    try {
        const { _id } = req._user;

        req.body.userId = _id
        next()
    } catch (e) {
        next(e)
    }
}

export default addUser;
