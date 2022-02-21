const mongoose=require('mongoose')

const songSchema=mongoose.Schema({
    videoId: {
        type: String,
        required: true,
        unique: true
    },
    publishedAt: {
        type: String
    },
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    thumbnails: {
        type: Map,
        of: Object
    },
    channelTitle: {
        type: String,
        trim: true
    },
    publishTime: {
        type: String
    },
    tag: {
        type: String,
        default: "song"
    },
    count: {
        type: Number,
        default: 0
    }
})

const Song=mongoose.model('Song', songSchema)

module.exports=Song