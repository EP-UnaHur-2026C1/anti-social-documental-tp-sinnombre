import User from "../models/User.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {

        const user = await User.create(req.body);

        res.status(201).json(user);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(user);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Usuario eliminado"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const followUser = async (req, res) => {

    try {

        const { userId, targetUserId } = req.body;

        const user = await User.findById(userId);
        const target = await User.findById(targetUserId);

        if (!user || !target) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        if (!user.following.includes(targetUserId)) {
            user.following.push(targetUserId);
        }

        if (!target.followers.includes(userId)) {
            target.followers.push(userId);
        }

        await user.save();
        await target.save();

        res.status(200).json({
            message: "Usuario seguido correctamente"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const unfollowUser = async (req, res) => {

    try {

        const { userId, targetUserId } = req.body;

        await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    following: targetUserId
                }
            }
        );

        await User.findByIdAndUpdate(
            targetUserId,
            {
                $pull: {
                    followers: userId
                }
            }
        );

        res.status(200).json({
            message: "Dejó de seguir al usuario"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};