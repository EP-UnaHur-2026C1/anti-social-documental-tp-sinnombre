import Comment from "../models/Comment.js";

export const getComments = async (req, res) => {
    try {

        const comments = await Comment.find({
            createdAt: {
                $gte: req.limitDate
            }
        })
        .populate("author")
        .populate("postId");

        res.status(200).json(comments);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

export const getCommentById = async (req, res) => {
    try {

        const comment = await Comment.findOne({
            _id: req.params.id,
            createdAt: {
                $gte: req.limitDate
            }
        })
        .populate("author")
        .populate("postId");

        if (!comment) {
            return res.status(404).json({
                message: "Comentario no encontrado o no visible"
            });
        }

        res.status(200).json(comment);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

export const createComment = async (req, res) => {
    try {

        const comment = await Comment.create(req.body);

        res.status(201).json(comment);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};

export const updateComment = async (req, res) => {
    try {

        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!comment) {
            return res.status(404).json({
                message: "Comentario no encontrado"
            });
        }

        res.status(200).json(comment);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};

export const deleteComment = async (req, res) => {
    try {

        const comment = await Comment.findByIdAndDelete(
            req.params.id
        );

        if (!comment) {
            return res.status(404).json({
                message: "Comentario no encontrado"
            });
        }

        res.status(200).json({
            message: "Comentario eliminado"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};