export const validatePost = (req, res, next) => {

    const { description, author } = req.body;

    if (!description) {

        return res.status(400).json({
            message: "La descripción es obligatoria"
        });

    }

    if (!author) {

        return res.status(400).json({
            message: "El autor es obligatorio"
        });

    }

    next();
};