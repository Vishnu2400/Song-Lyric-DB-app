const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lyricSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String
    },
    lyrics: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Lyric = mongoose.model('Lyric', lyricSchema);

module.exports = Lyric;
