import { StatusCodes } from "http-status-codes";
import User from '../models/UserModel.js'

export const getLeaderboard = async (req, res) => {
    const { limit } = req.query;
    const leaderboard = (await User.find({}).gt('time', 0).sort('time').limit(limit))

    res.status(StatusCodes.OK).json({ leaderboard: leaderboard })
}

export const updateLeaderboard = async (req, res) => {
    const newUser = { ...req.body }
    delete newUser.password

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser)
    res.status(StatusCodes.OK).json({ msg: 'update user' })
}