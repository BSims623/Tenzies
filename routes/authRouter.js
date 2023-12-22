import Router from 'express'
import { register, login, logout } from '../controllers/authController.js'
import { validateRegisterInput } from '../middleware/validationMiddleware.js'
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 15,
    standardHeaders: true,
    legacyHeaders: false,
    message: { msg: 'IP rate limit exceeded, try again in 15 minutes' },
})

const router = Router()

router.post('/register', limiter, validateRegisterInput, register)
router.post('/login', limiter, login)
router.get('/logout', logout)

export default router