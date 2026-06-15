export const validateUser = (req, res, next) => {

    const { nickName } = req.body;

    if (!nickName) {

        return res.status(400).json({
            message: "nickName es obligatorio"
        });

    }

    next();
};