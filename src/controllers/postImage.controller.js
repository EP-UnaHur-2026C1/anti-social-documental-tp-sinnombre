import PostImage from '../models/PostImage.js'
import Post from '../models/Post.js'

export const getImages = async (req, res) => {
  try {
    const images = await PostImage.find().populate('postId')
    res.status(200).json(images)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getImageById = async (req, res) => {
  try {
    const image = await PostImage.findById(req.params.id).populate('postId')
    if (!image) {
      return res.status(404).json({ message: 'Imagen no encontrada' })
    }
    res.status(200).json(image)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createImage = async (req, res) => {
  try {
    const { url, postId } = req.body

    // Crear la imagen
    const image = await PostImage.create({ url, postId })

    // Agregar automáticamente el ID al array images del post
    await Post.findByIdAndUpdate(
      postId,
      { $push: { images: image._id } }
    )

    res.status(201).json(image)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateImage = async (req, res) => {
  try {
    const image = await PostImage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!image) {
      return res.status(404).json({ message: 'Imagen no encontrada' })
    }
    res.status(200).json(image)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteImage = async (req, res) => {
  try {
    const image = await PostImage.findByIdAndDelete(req.params.id)
    if (!image) {
      return res.status(404).json({ message: 'Imagen no encontrada' })
    }

    // Sacar el ID del array images del post
    await Post.findByIdAndUpdate(
      image.postId,
      { $pull: { images: image._id } }
    )

    res.status(200).json({ message: 'Imagen eliminada' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}