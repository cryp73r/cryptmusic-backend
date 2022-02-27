const express=require('express')
const User=require('../models/user')
const auth=require('../middleware/auth')

const router=express.Router()

router.get('/', (req, res)=>{
    res.status(200).send()
})

router.post('/user/create', async (req, res)=>{
    const user=new User(req.body)
    try {
        await user.save()
        const token=await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/user', async (req, res)=>{
    const email=req.body.email
    const password=req.body.password
    try {
        const user=await User.findByCredentials(email, password)
        const token=await user.generateAuthToken()
        res.status(200).send({user, token})
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/user/logout', auth, async (req, res)=>{
    const user=req.user
    try {
        user.tokens=user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await user.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/user/logoutall', auth, async (req, res)=>{
    const user=req.user
    try {
        user.tokens=[]
        await user.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/user', auth, async (req, res)=>{
    res.status(200).send(req.user)
})

router.patch('/user', auth, async (req, res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name', 'email', 'password']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send()
    }
    const user=req.user
    try {
        updates.forEach((update)=>user[update]=req.body[update])
        await user.save()
        res.status(200).send({user})
    } catch (error) {
        res.status(400).send()
    }
})

router.delete('/user', auth, async (req, res)=>{
    const user=req.user
    try {
        await user.remove()
        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }
})

module.exports=router