import mongoose from 'mongoose';
const { Schema } = mongoose;

const subAwardSchema = new Schema({
    _id: false,
    wins: {type: Number},
    nominations: {type: Number},
    text: {
        type: String,
        default: function() {
            //todo other cases
            if(this.wins > 1 && this.nominations > 1){
            return `${this.wins} wins & ${this.nominations} nominations`};
            if (this.wins == 0 && this.nominations > 1) {
                return `${this.wins} wins & ${this.nominations}`};
            
        }
    }
});

const movieSchema = new Schema({

        plot: {
            type: String, 
            required: true
        },
        genres: [String],
        runtime: {
            type: Number, 
            required: true
        },
        rated: {type: String},
        cast: [String],
        poster: {
            type: String,
            required: true,
            match: /^https?:\/\/.+/
        },
        title: {
            type: String,
            required: true
        },
        fullplot: {
            type: String, 
            required: true
        },
        languages: [String],
        released: {
            type: Date
        },
        directors: [String],
        writers: [String],
        awards: { type: subAwardSchema },
        lastupdated: {
            type: Date, 
            default: Date.now()
        },
        year: {
            type: Number, 
            required: true
        },
        imdb: {


        //   "rating": 8.4,
        //   "votes": 56858,
        //   "id": 12349
        },
        countries: [String],
        type: {type: String},
        tomatoes: {


        //   "viewer": {
        //     "rating": 4.2,
        //     "numReviews": 14860,
        //     "meter": 96
        //   },
        //   "dvd": {
        //     "$date": {
        //       "$numberLong": "1078185600000"
        //     }
        //   },
        //   "critic": {
        //     "rating": 8.7,
        //     "numReviews": 22,
        //     "meter": 100
        //   },
        //   "lastUpdated": {
        //     "$date": {
        //       "$numberLong": "1442252996000"
        //     }
        //   },
        //   "rotten": 0,
        //   "production": "First National Pictures Inc.",
        //   "fresh": 22
        },
        num_mflix_comments: {type: Number}
})



const Movie = mongoose.model('Movie', movieSchema);




export async function getMovieById(movieId) {
    if(movieId.length !== 24) throw new Error(`Movie ID ${movieId} not valid`, {cause: 400})
    let specificMovie = await Movie.findById(movieId);
    if (!specificMovie) throw new Error(`Movie with ID ${movieId} not found`, {cause: 404})
    return specificMovie;
}

export async function getMovieByTitle(title, limit) {

    if(!limit) limit = 10;
    else limit = parseInt(limit)
    title = title.toLowerCase();
    let foundMovies = await Movie.find({ "title" : { $regex : new RegExp(`${title}`, "i") } }).limit(limit)

    let amountOfFoundMovies = foundMovies.length;
    
    if(!amountOfFoundMovies) throw new Error(`No movies found by searching for${title}`, {cause: 404});
    foundMovies.unshift({amountOfFoundMovies: amountOfFoundMovies})
    return foundMovies

}

export async function updateMovieById(movieId, body) {
    let validUpdate = false;
    let movie = await getMovieById(movieId);

    if (body.plot && body.plot.length > 0) {
        validUpdate = true;
        movie.plot = body.plot;
    }
    if (body.title && body.title.length > 0) {
        validUpdate = true;
        movie.title = body.title;
    }
    if(validUpdate) return await movie.save();
    else throw new Error(`invalid Input - no changes were made`, {cause: 400})
}

export async function deleteMovieById(movieId) {
    if(movieId.length !== 24) throw new Error(`Movie ID ${movieId} not valid`, {cause: 400})
    let deletedMovie = await Movie.findByIdAndDelete(movieId);
    if (!deletedMovie) throw new Error(`Movie with ID ${movieId} not found`, {cause: 404})
    return deletedMovie;
}


