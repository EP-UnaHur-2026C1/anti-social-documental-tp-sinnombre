export const validateImage = (req, res, next) => {

    const { url, postId } = req.body;

    if (!url) {

        return res.status(400).json({
            message: "URL obligatoria"
        });

    }

    if (!postId) {

        return res.status(400).json({
            message: "Post obligatorio"
        });

    }

    next();
};