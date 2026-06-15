import PostImage from "../models/PostImage.js";

export const getImages = async (req,res)=>{
    res.json(await PostImage.find());
};

export const getImageById = async (req,res)=>{
    res.json(await PostImage.findById(req.params.id));
};

export const createImage = async (req,res)=>{
    res.status(201).json(await PostImage.create(req.body));
};

export const updateImage = async (req,res)=>{

    res.json(
        await PostImage.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true }
        )
    );
};

export const deleteImage = async (req,res)=>{

    await PostImage.findByIdAndDelete(req.params.id);

    res.json({
        message:"Imagen eliminada"
    });
};