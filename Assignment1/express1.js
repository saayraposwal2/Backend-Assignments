const express = require('express');
const fs = require('fs');
const app = express();



app.use((req, res,next)=>{

   
    console.log(req.ip);
    let info = `${req.method} request for ${req.url}`;
    fs.appendFile("file1.txt", `${info} `, "utf8", (error)=>{
        if(error)throw error;
        console.log("Logged succsefully");
    })
    let date = new Date();
    fs.appendFile("file1.txt", ` ${date}\n`,"utf8",(error)=>{
        if(error)throw error;
        console.log("logged successfully");  
   });
    next();
})

// app.use((req,res,next)=>{
//     console.log('Middleware 1');
//     console.log('Request URL:',req.url);
//     console.log('Request Method:',req.method);
//     console.log('Request Time:',new Date());
//     console.log('Request IP:',req.ip);
//     next();
// });

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.get('/profile/:commentId/:Id',(req,res)=>{
    console.log(req.params);
    const {commentId,Id}=req.params;
    // res.send('print the commentId and Id');
    res.send(`Comment ID: ${req.params.commentId} and ID: ${req.params.Id}`);
}   );



app.listen(4000, ()=>{
    console.log("server is listening...");
})

