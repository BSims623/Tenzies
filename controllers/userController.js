import { StatusCodes } from "http-status-codes";
import User from '../models/UserModel.js'
import cloudinary from 'cloudinary';
import { formatImage } from "../middleware/multerMiddleware.js";

export const getAllUsers = async (req, res) => {
    const users = await User.find({})
    res.status(StatusCodes.OK).json({ users: users })
}

export const getCurrentUser = async (req, res) => {
    const user = await User.findById({ _id: req.user.userId })
    const userWithoutPassword = user.toJSON()

    res.status(StatusCodes.OK).json({ user: userWithoutPassword })
}

export const updateUser = async (req, res) => {

    //console.log(req.file);
    const newUser = { ...req.body }
    delete newUser.password

    if (req.file) {
        const file = formatImage(req.file)
        //const response = await cloudinary.v2.uploader.upload(file);
        const response = await cloudinary.v2.uploader.upload(file, {
            transformation: [
                { fetch_format: "auto" }
            ]
        });
        newUser.avatar = response.secure_url
        newUser.avatarPublicId = response.public_id
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser)

    if (req.file && updatedUser.avatarPublicId) {
        if (updatedUser.avatarPublicId !== "aybdxqwunddnpp5vtqxd") await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }

    res.status(StatusCodes.OK).json({ msg: 'update user' })
}

export const deleteUser = async (req, res) => {
    if (req.user.avatarPublicId !== "aybdxqwunddnpp5vtqxd") await cloudinary.v2.uploader.destroy(req.user.avatarPublicId);
    await User.findByIdAndDelete(req.user.userId)
    res.status(StatusCodes.OK).json({ msg: 'user deleted' })
}