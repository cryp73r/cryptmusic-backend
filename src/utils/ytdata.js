const request=require('request')

const ytdata=(url, callback)=>{
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
}

module.exports=ytdata