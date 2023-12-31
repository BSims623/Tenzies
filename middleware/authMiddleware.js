import { BadRequestError, UnauthenticatedError, UnauthorizedError } from "../errors/customError.js";
import { verifyJWT } from '../utils/tokenUtils.js'

export const authenticateUser = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) throw new UnauthenticatedError('authentication invalid')
    try {
        const { userId, role, avatarPublicId } = verifyJWT(token);
        const testUser = userId === '6585164351c0bb0f83028abd'
        req.user = { userId, role, testUser, avatarPublicId }
        next()
    } catch (error) {
        throw new UnauthenticatedError('authentication invalid')
    }
}

export const checkForTestUser = (req, res, next) => {
    if (req.user.testUser) throw new BadRequestError('Demo User. Read Only!');
    next()
}