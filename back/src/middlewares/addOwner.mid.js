function addOwner(req, res, next) {
    try {
        const { _id } = req.user;

        req.body.ownerId = _id
        next()
    } catch (e) {
        next(e);
    }
}

export default addOwner;
