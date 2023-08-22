const express = require('express');
var cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const {MONGOURI} = require('./config/keys');

app.use(cors());
mongoose.connect(MONGOURI);
mongoose.connection.on('connected', ()=>{
    console.log('connected to MG')
});

require('./models/user');
require('./models/post')
app.use(express.json())
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

if(process.env.NODE_ENV == "production"){
    app.use(express.static('frontend/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build', 'index.html'))
    })
}

app.listen(PORT, ()=>{
    console.log("server is running on", PORT);
});