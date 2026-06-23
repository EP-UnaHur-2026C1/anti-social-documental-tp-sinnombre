import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import User from '../models/User.js'
import { sendVerificationEmail } from '../utils/mailer.js'

//creación de un nuevo usuario, con verificación por email
export const createUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const verificationToken = crypto.randomBytes(32).toString('hex')

    const user = await User.create({
      ...rest,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
    })

    await sendVerificationEmail(user.email, verificationToken)

    res.status(201).json({
      message: 'Usuario creado. Revisá tu correo para verificar la cuenta.',
      user: {
        _id: user._id,
        nickName: user.nickName,
        email: user.email,
        isVerified: user.isVerified,
      }
      
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params
    
    const user = await User.findOne({ verificationToken: token })
    if (!user) {
      return res.status(400).json({ message: 'Token inválido o expirado' })
    }

    user.isVerified = true
    user.verificationToken = undefined
    await user.save()

    res.json({ message: 'Cuenta verificada correctamente' })
    console.log("USER ENCONTRADO:", user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña requeridos' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' })
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Debés verificar tu correo antes de iniciar sesión' })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        _id: user._id,
        nickName: user.nickName,
        email: user.email,
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Devuelve una lista de todos los usuarios, sin incluir la contraseña
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Elimina un usuario por su ID
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Usuario eliminado' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//agregar un usuario a la lista de seguidores de otro usuario
export const followUser = async (req, res) => {
  try {
    const { userId, targetUserId } = req.body

    await User.findByIdAndUpdate(userId, {
      $addToSet: { following: targetUserId }
    })

    await User.findByIdAndUpdate(targetUserId, {
      $addToSet: { followers: userId }
    })

    res.status(200).json({ message: 'Usuario seguido correctamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
// dejar de seguir a un usuario 
export const unfollowUser = async (req, res) => {
  try {
    const { userId, targetUserId } = req.body

    await User.findByIdAndUpdate(userId, { $pull: { following: targetUserId } })
    await User.findByIdAndUpdate(targetUserId, { $pull: { followers: userId } })

    res.status(200).json({ message: 'Dejó de seguir al usuario' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}