const express=require('express')
const ytdl=require('@distube/ytdl-core')
const rangeParser = require('range-parser');

const router=express.Router()

router.get('/player', async (req, res)=>{
    const v=req.query.v
    if (!v) {
        return res.status(400).send()
    }
    try {
        const info = await ytdl.getInfo(`https://www.youtube.com/watch?v=${v}`);
        const audioFormat = ytdl.chooseFormat(info.formats, {
            quality: 'highestaudio',
            filter: 'audioonly'
        })

        if (!audioFormat) {
            return res.status(404).send('No suitable audio format found.');
        }

        const contentLength = parseInt(audioFormat.contentLength, 10);
        const range = req.headers.range;

        if (range && range.length > 1) {
            const ranges = rangeParser(contentLength, range)

            const r = ranges[0];
            const start = r.start;
            const end = r.end || contentLength - 1;
            const chunkSize = (end - start) + 1;

            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${contentLength}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'audio/mp4'
            })

            ytdl(`https://www.youtube.com/watch?v=${v}`, {
                quality: 'highestaudio',
                filter: 'audioonly',
                range: {start, end}
            }).pipe(res)
        } else {
            res.writeHead(200, {
                'Content-Length': contentLength,
                'Content-Type': 'audio/mp4'
            })

            ytdl(`https://www.youtube.com/watch?v=${v}`, {
                quality: 'highestaudio',
                filter: 'audioonly'
            }).pipe(res)
        }
    } catch (error) {
        res.status(500).send()
    }
})

module.exports=router