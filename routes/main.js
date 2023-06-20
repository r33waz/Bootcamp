import experss from 'express'
import bootcampRouter from './bootcamp.route.js'
import userRouter from './user.route.js'
import reviewsRouter from './reviews.router.js'
import courseRouter from './course.route.js'

const router = experss.Router()

router.use('/bootcamp', bootcampRouter);
router.use('/user',userRouter)
router.use('/course',courseRouter)
router.use('/reviews', reviewsRouter)

export default router;