import * as commentModel from '../models/comments.model.js'

export async function getAll(req, res) {
    // res.send(await User.find());

    res.send(await commentModel.getAll());
}

export async function getCommentById(req, res) {
   
    try {
        res.status(200).send(await commentModel.getCommentById(req.params.id));

        
    } catch (err) {
        let error = {
            msg: err.message,
            code: err.cause
        }
        if(!error.code) res.status(400).send(error.msg);
        else res.status(error.code).send(error.msg);
    }

}

export async function updateCommentData(req, res) {

    try {
        res.status(200).send(await commentModel.updateCommentById(req.params.id, req.body));
    } catch (err) {
        let error = {
            msg: err.message,
            code: err.cause
        }
        if(!error.code) res.status(400).send(error.msg);
        else res.status(error.code).send(error.msg);
    }

}

export async function deleteComment(req, res) {

    try {
        res.status(200).send(await commentModel.deleteCommentById(req.params.id, req.body));
    } catch (err) {
        let error = {
            msg: err.message,
            code: err.cause
        }
        if(!error.code) res.status(400).send(error.msg);
        else res.status(error.code).send(error.msg);
    }

}