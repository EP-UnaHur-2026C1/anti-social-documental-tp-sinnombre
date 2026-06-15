import Tag from "../models/Tag.js";

export const getTags = async (req,res)=>{
    res.json(await Tag.find());
};

export const getTagById = async (req,res)=>{
    res.json(await Tag.findById(req.params.id));
};

export const createTag = async (req,res)=>{
    res.status(201).json(await Tag.create(req.body));
};

export const updateTag = async (req,res)=>{
    res.json(
        await Tag.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true }
        )
    );
};

export const deleteTag = async (req,res)=>{
    await Tag.findByIdAndDelete(req.params.id);

    res.json({
        message:"Tag eliminado"
    });
};