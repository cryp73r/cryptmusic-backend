const request=require('request')
const iplocation=require('./iplocation')

const ytdata=(req, query, callback)=>{
    let url=`https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_KEY}&q=${encodeURIComponent(query)}&part=snippet&maxResults=10`
    const ipaddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    iplocation(ipaddress, (error, body)=>{
        if (!error) {
            url+=`&location=${body.lat}%2C%20${body.lon}&locationRadius=500km&type=video%2Clist`
        }
        request({url, json: true}, (error, {body})=>{
            if (error) {
                callback('Unable to connect to YT API', undefined)
            } else if (body.error) {
                callback('Limit exceeded', undefined)
            }
            else if (body.items.length===0) {
                callback('No match found!', undefined)
            } else {
                let result=[]
                body.items.forEach((data)=>{
                    result.push({
                        videoId: data.id.videoId,
                        publishedAt: data.snippet.publishedAt,
                        title: data.snippet.title,
                        description: data.snippet.description,
                        thumbnails: data.snippet.thumbnails,
                        channelTitle: data.snippet.channelTitle,
                        publishTime: data.snippet.publishTime
                    })
                })
                callback(undefined, result)
            }
        })
    })
}

module.exports=ytdata