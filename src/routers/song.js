const express=require('express')
const Song=require('../models/song')
const auth=require('../middleware/auth')

const router=express.Router()

router.post('/song', async (req, res)=>{
    const song=new Song(req.body)
    try {
        song.count++;
        await song.save()
        res.status(201).send(song)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/song', async (req, res)=>{
    sort={}
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1]==='desc'?-1:1
    }
    try {
        const song=await Song.find({}, [], {
            skip: parseInt(req.query.skip),
            limit: parseInt(req.query.limit),
            sort
        })
        res.status(200).send(song)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/song/:id', async (req, res)=>{
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

router.patch('/song/:id', async (req, res)=>{
    const _id=req.params.id
    try {
        const song=await Song.findOne({_id})
        if (!song) {
            return res.status(404).send()
        }
        song.count++
        await song.save()
        res.status(200).send()
    } catch(error) {
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