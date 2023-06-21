import express from 'express'
import { addBootcamp } from '../controllers/bootcamp.controller.js';
import { uplaod } from '../middlewares/multer.middleware.js';
import { authorizationUser, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router()

router.get('/', (req, res) => {
    res.send('bootcamp')
})


router.post("/", authorizationUser,authorize('admin','publisher'),uplaod.single("photo"), addBootcamp);

export default router