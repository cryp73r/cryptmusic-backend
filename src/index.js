const express=require('express')
const cors=require('cors')
require('./db/mongoose')
const userRouter=require('./routers/user')
const playlistRouter=require('./routers/playlist')
const songRouter=require('./routers/song')
const searchRouter=require('./routers/search')

const app=express()
var expressWs = require('express-ws')(app);

const port=process.env.PORT

app.use(express.json())
app.use(cors({origin: 'http://localhost:55365', optionsSuccessStatus: 200}))
app.use(userRouter)
app.use(playlistRouter)
app.use(songRouter)
app.use(searchRouter)

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})