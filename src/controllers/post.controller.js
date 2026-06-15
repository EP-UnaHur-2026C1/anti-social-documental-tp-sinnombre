import Post from "../models/Post.js";

export const getPosts = async (req,res)=>{

    const posts = await Post.find()
        .populate("author")
        .populate("tags")
        .populate("images");

    res.json(posts);
};

export const getPostById = async (req,res)=>{

    const post = await Post.findById(req.params.id)
        .populate("author")
        .populate("tags")
        .populate("images");

    res.json(post);
};

export const createPost = async (req,res)=>{

    const post = await Post.create(req.body);

    res.status(201).json(post);
};

export const updatePost = async (req,res)=>{

    const post = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true }
    );

    res.json(post);
};

export const deletePost = async (req,res)=>{

    await Post.findByIdAndDelete(req.params.id);

    res.json({
        message:"Post eliminado"
    });
};

export const addTagToPost = async (req,res)=>{

    const { postId, tagId } = req.body;

    const post = await Post.findById(postId);

    post.tags.push(tagId);

    await post.save();

    res.json(post);
};

export const removeTagFromPost = async (req,res)=>{

    const { postId, tagId } = req.body;

    const post = await Post.findByIdAndUpdate(
        postId,
        {
            $pull:{
                tags:tagId
            }
        },
        { new:true }
    );

    res.json(post);
};

export const addImageToPost = async (req,res)=>{

    const { postId, imageId } = req.body;

    const post = await Post.findById(postId);

    post.images.push(imageId);

    await post.save();

    res.json(post);
};

export const removeImageFromPost = async (req,res)=>{

    const { postId, imageId } = req.body;

    const post = await Post.findByIdAndUpdate(
        postId,
        {
            $pull:{
                images:imageId
            }
        },
        { new:true }
    );

    res.json(post);
};