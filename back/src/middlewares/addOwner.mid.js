function addOwner(req, res, next) {
    try {
        req.body.ownerId = req._user?._id;

        next()
    } catch (e) {
        next(e);
    }
}

export default addOwner;
