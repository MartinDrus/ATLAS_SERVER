import { Router } from "express";
import * as userController from '../controllers/users.controller.js'

const usersRouter = new Router();



usersRouter.route('/update/:id')
    .patch(userController.updateMovieData)

usersRouter.route('/searchbyid/:id')
    .get(userController.getMovieById)

usersRouter.route('/searchbytitle/:title')
    .get(userController.getMovieByTitle)

usersRouter.route('/delete/:id')
    .delete(userController.deleteMovie)


export default usersRouter;