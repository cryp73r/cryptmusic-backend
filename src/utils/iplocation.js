const request = require('request')

const iplocation = (ipaddress, callback)=>{
    const url=`http://ip-api.com/json/${ipaddress}`
    request.get({url, json: true}, (error, {body}={})=>{
        if (error) {
            return callback('Unable to connect to IP-API', undefined)
        } else if (body.status==="fail") {
            return callback('Invalid IP', undefined)
        }
        callback(undefined, body)
    })
}

module.exports = iplocation