import { Router } from "express";
import { getAllUsers, getCurrentUser, updateUser, deleteUser } from "../controllers/userController.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";
import { validateEditUserInput } from "../middleware/validationMiddleware.js";
import upload from "../middleware/multerMiddleware.js";



const router = Router();

router.get('/all-users', getAllUsers)
router.get('/current-user', getCurrentUser)
router.patch('/update-user', checkForTestUser, upload.single('avatar'), validateEditUserInput, updateUser)
router.patch('/update-guest', updateUser)
router.delete('/delete-user', checkForTestUser, deleteUser)

export default router