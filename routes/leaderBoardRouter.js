import { Router } from "express";
import { updateLeaderboard, getLeaderboard } from "../controllers/leaderBoardController.js";


const router = Router();

router.get('/get-leaderboard', getLeaderboard)
router.patch('/update-leaderboard', updateLeaderboard)

export default router