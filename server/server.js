const express = require('express');
const Path = require('path');

var app = express();
const port = process.env.PORT || 3000;
const PublicPath = Path.join(__dirname,'../public');

app.use(express.static(PublicPath));

app.listen(port,()=>{
    console.log(`Listening on${port}`);
})