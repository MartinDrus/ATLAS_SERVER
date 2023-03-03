import { Router } from "express";
import * as movieController from '../controllers/movies.controller.js'





const moviesRouter = new Router();

moviesRouter.route('/')
    .get(movieController.getAll)

moviesRouter.route('/update/:id')
    .patch(movieController.updateMovieData)

moviesRouter.route('/searchbyid/:id')
    .get(movieController.getMovieById)

moviesRouter.route('/searchbytitle/:title')
    .get(movieController.getMovieByTitle)

moviesRouter.route('/delete/:id')
    .delete(movieController.deleteMovie)


export default moviesRouter;