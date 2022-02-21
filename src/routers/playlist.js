const express=require('express')
const Playlist=require('../models/playlist')
const auth=require('../middleware/auth')

const router=express.Router()

router.post('/playlist/create', auth, async (req, res)=>{
    const playlist=new Playlist({
        ...req.body,
        createdBy: req.user._id
    })
    try {
        await playlist.save()
        res.status(201).send(playlist)
    } catch(error) {
        res.status(400).send()
    }
})

router.get('/playlist', auth, async (req, res)=>{
    const createdBy=req.user._id
    try {
        const playlist=await Playlist.find({createdBy})
        if (playlist.length===0) {
            return res.status(404).send()
        }
        res.status(200).send(playlist)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/playlist/:id', auth, async (req, res)=>{
    const createdBy=req.user._id
    const _id=req.params.id
    try {
        const playlist=await Playlist.find({_id, createdBy})
        if (playlist.length===0) {
            return res.status(404).send()
        }
        res.status(200).send(playlist)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/playlist/add/:id', auth, async(req, res)=>{
    const _id=req.params.id
    const createdBy=req.user._id
    try {
        const playlist=await Playlist.findOne({_id, createdBy})
        if (!playlist) {
            return res.status(404).send()
        }
        playlist.songs=playlist.songs.concat(req.body)
        await playlist.save()
        res.status(200).send(playlist)
    } catch (error) {
        res.status(400).send()
    }
})

router.patch('/playlist/remove/:id', auth, async (req, res)=>{
    const _id=req.params.id
    const createdBy=req.user._id
    try {
        const playlist=await Playlist.findOne({_id, createdBy})
        if (!playlist) {
            return res.status(404).send()
        }
        const songs=playlist.songs
        const songId=req.body
        playlist.songs=songs.filter((song)=>song.songId!==songId)
        await playlist.save()
        res.status(200).send(playlist)
    } catch(error) {
        res.status(400).send(error)
    }
})

router.delete('/playlist/:id', auth, async (req, res)=>{
    const _id=req.params.id
    const createdBy=req.user._id
    try {
        const playlist=await Playlist.findOne({_id, createdBy})
        if (!playlist) {
            return res.status(404).send()
        }
        await playlist.remove()
        res.status(200).send(playlist)
    } catch (error) {
        res.status(400).send()
    }
})

module.exports=router