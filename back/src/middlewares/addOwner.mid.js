function addOwner(req, res, next) {
    try {
        req.body.ownerId = req.user?._id;

        next()
    } catch (e) {
        next(e);
    }
}

export default addOwner;
