const express=require('express')
const Song=require('../models/song')
const auth=require('../middleware/auth')

const router=express.Router()

router.post('/song', async (req, res)=>{
    const song=new Song(req.body)
    try {
        await song.save()
        res.status(201).send(song)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/song', auth, async (req, res)=>{
    try {
        const song=await Song.find({})
        res.status(200).send(song)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/song/:id', auth, async (req, res)=>{
    const _id=req.params.id
    try {
        const song=await Song.findOne({_id})
        if (!song) {
            return res.status(404).send()
        }
        res.status(200).send(song)
    } catch (error) {
        res.status(400).send()
    }
})

router.delete('/song/:id', auth, async (req, res)=>{
    const _id=req.params.id
    try {
        const song=await Song.findOne({_id})
        if (!song) {
            return res.status(404).send()
        }
        await song.remove()
        res.status(200).send()
    } catch (error) {
        res.status(400).send()
    }
})

module.exports=router