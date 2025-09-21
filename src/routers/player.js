const express=require('express')
const ytdl=require('@distube/ytdl-core')

const router=express.Router()

router.get('/player', (req, res)=>{
    const v=req.query.v
    if (!v) {
        return res.status(400).send()
    }
    try {
        ytdl(`https://www.youtube.com/watch?v=${v}`, {
        quality: 'highestaudio',
        filter: 'audioonly'
    }).pipe(res)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports=router