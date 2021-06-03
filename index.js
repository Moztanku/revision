const express = require('express');
const app = express();
app.use(express.static(__dirname+'/html-css/Strona 2/'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/html-css/Strona 2/index.html');
});

app.listen(3000,"localhost",()=>{
    console.log("Listening on port 3000...");
});