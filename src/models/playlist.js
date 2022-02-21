const mongoose=require('mongoose')

const playSchema=mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tag: {
        type: String,
        default: "playlist"
    },
    songs: [{
        songId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Song'
        }
    }]
}, {
    timestamps: true
})

playSchema.pre('save', async function (next) {
    const playlist=this
    const songs=playlist.songs
    for(let i=0; i<songs.length-1; i++) {
        for (let j=i+1; j<songs.length; j++) {
            if (songs[i].songId===songs[j].songId) {
                throw new Error('Duplicate songs in list')
            }
        }
    }
    next()
})

const Playlist=mongoose.model('Playlist', playSchema)

module.exports=Playlist