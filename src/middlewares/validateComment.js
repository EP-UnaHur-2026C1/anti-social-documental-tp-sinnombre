export const validateComment = (req, res, next) => {

    const { content, author, postId } = req.body;

    if (!content) {

        return res.status(400).json({
            message: "El comentario no puede estar vacío"
        });

    }

    if (!author) {

        return res.status(400).json({
            message: "Autor obligatorio"
        });

    }

    if (!postId) {

        return res.status(400).json({
            message: "Post obligatorio"
        });

    }

    next();
};