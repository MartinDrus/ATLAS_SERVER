import { Router } from "express";
import * as commentController from '../controllers/comments.controller.js'





const commentsRouter = new Router();

commentsRouter.route('/')
    .get(commentController.getAll)
    .post()

commentsRouter.route('/searchbyid/:id')
    .get(commentController.getCommentById)

commentsRouter.route('/update/:id')
    .patch(commentController.updateCommentData)

commentsRouter.route('/delete/:id')
    .delete(commentController.deleteComment)

export default commentsRouter;