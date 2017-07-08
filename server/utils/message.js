var generateMessage = (from,text)=>{
    return{
        from,
        text,
        At:new Date().getTime()
    }
}

module.exports = {generateMessage}