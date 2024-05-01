const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const lyricSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    artist: {
        type: String,
        required: true
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

// Add new lyric
Lyric.addLyric = async function(title, artist, lyrics, user) {
    try {
        const newLyric = new Lyric({
            title: title,
            artist: artist, 
            lyrics: lyrics,
            user: user
        });
        await newLyric.save();
        return newLyric;
    } catch (error) {
        throw new Error(error);
    }
};



// Delete lyric by ID
Lyric.deleteLyric = async function(lyricId) {
    try {
        await Lyric.findByIdAndDelete(lyricId);
    } catch (error) {
        throw new Error(error);
    }
};

// Modify lyric by ID
Lyric.modifyLyric = async function(lyricId, updates) {
    try {
        const updatedLyric = await Lyric.findByIdAndUpdate(lyricId, updates, { new: true });
        return updatedLyric;
    } catch (error) {
        throw new Error(error);
    }
};




