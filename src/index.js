const express=require('express')
require('./db/mongoose')
const userRouter=require('./routers/user')
const playlistRouter=require('./routers/playlist')
const songRouter=require('./routers/song')
const searchRouter=require('./routers/search')

const app=express()
var expressWs = require('express-ws')(app);

const port=process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(playlistRouter)
app.use(songRouter)
app.use(searchRouter)

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})