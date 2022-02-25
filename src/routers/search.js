const express=require('express')
const auth=require('../middleware/auth')
const Song=require('../models/song')
const Playlist=require('../models/playlist')
const ytdata=require('../utils/ytdata')

const app=express()
const expressWs=require('express-ws')(app)

const router=express.Router()

router.ws('/search', (ws, req)=>{
    ws.on('message', async (payload)=>{
        payload=JSON.parse(payload)
        try {
            const song=await Song.find({$or: [{title: {$regex: `^${payload.query}`, $options: 'i'}}, {description: {$regex: `^${payload.query}`, $options: 'i'}}]})
            const playlist=await Playlist.find({title: {$regex: `^${payload.query}`, $options: 'i'}})
            if (song.length===0 && playlist.length===0) {
                ytdata(payload.query, (error, ytresult)=>{
                    if (error) {
                        ws.send({
                            error: 'Unknown error occured'
                        })
                    }
                    ws.send(JSON.stringify(ytresult))
                })
            } else {
                const result=song.concat(playlist)
                ws.send(JSON.stringify(result))
            }
            
        } catch (error) {
            ws.send('an error occured!')
        }
    })
})

module.exports=router