import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
          validator: function(v) {
            // Using a regular expression to validate email address
            return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
          },
          message: props => `${props.value} is not a valid email address!`
        }
      },
    movie_id: {
        type: mongoose.Types.ObjectId, ref: 'Movie'
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);

export async function getCommentById(commentId) {
	if(commentId.length !== 24) throw new Error(`Comment ID ${commentId} not valid`, {cause: 400})
	
    let specificComment = await Comment.findById(commentId).populate('movie_id');
	
    if (!specificComment) throw new Error(`Comment with ID ${commentId} not found`, {cause: 404})

	return specificComment;
}

export async function updateCommentById(commentId, body) {

	let validUpdate = false;
	let comment = await getCommentById(commentId);

	if (body.text && body.text.length > 0) {
		validUpdate = true;
		comment.text = body.text;
	}

	if(validUpdate) return await comment.save();
    else throw new Error(`invalid Input - no changes were made`, {cause: 400})
}

export async function deleteCommentById(commentId) {
    if(commentId.length !== 24) throw new Error(`Comment ID ${commentId} not valid`, {cause: 400})
    let deletedComment = await Movie.findByIdAndDelete(commentId);
    if (!deletedComment) throw new Error(`Comment with ID ${commentId} not found`, {cause: 404})
    return deletedComment;
}



  