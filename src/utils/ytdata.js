const request=require('request')

const ytdata=(query, callback)=>{
    const url=`https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_KEY}&q=${query}&part=snippet&maxResults=10`
    request({url, json: true}, (error, {body})=>{
        if (error) {
            callback('Unable to connect to YT API', undefined)
        } else if (!body.items) {
            callback('Invalid search', undefined)
        } else if (body.items.length===0) {
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
}

module.exports=ytdata