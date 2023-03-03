import * as movieModel from '../models/movies.model.js'

export async function getAll(req, res) {
    // res.send(await User.find());

    let allMovies = await movieModel.getAll();
    console.log("🚀 ~ file: movies.controller.js:7 ~ getAll ~ allMovies:", allMovies)

    res.send(allMovies);
}

export async function getMovieById(req, res) {
   
    try {
        res.status(200).send(await movieModel.getMovieById(req.params.id));
    } catch (err) {
        let error = {
            msg: err.message,
            code: err.cause
        }
        if(!error.code) res.status(400).send(error.msg);
        else res.status(error.code).send(error.msg);
    }

}

export async function getMovieByTitle(req, res) {
    let title = req.params.title;
    let limit = req.query.limit;

    try {
        res.status(200).send(await movieModel.getMovieByTitle(title, limit));
    } catch (err) {
        let error = {
            msg: err.message,
            code: err.cause
        }
        if(!error.code) res.status(400).send(error.msg);
        else res.status(error.code).send(error.msg);
    }


}

export async function updateMovieData(req, res) {

    try {
        res.status(200).send(await movieModel.updateMovieById(req.params.id, req.body));
    } catch (err) {
        let error = {
            msg: err.message,
            code: err.cause
        }
        if(!error.code) res.status(400).send(error.msg);
        else res.status(error.code).send(error.msg);
    }

}

export async function deleteMovie(req, res) {

    try {
        res.status(200).send(await movieModel.deleteMovieById(req.params.id));
    } catch (err) {
        let error = {
            msg: err.message,
            code: err.cause
        }
        if(!error.code) res.status(400).send(error.msg);
        else res.status(error.code).send(error.msg);
    }

}