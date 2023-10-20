import { Router } from "express"
import posts from "./post.routes.js"
import gets from "./gets.routes.js"

const router = Router()

router.use(posts)
router.use(gets)



export default router