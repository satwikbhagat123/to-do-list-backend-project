const express =require('express');
const app =express();
const path = require('path');
const fs =require('fs');  //available in nodejs code 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//by doing this we can use images,audio video javascripts files,css files these are called static files which are present in public folder and we can use in this projects also by writting the below line
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get("/",function(req,res){
    fs.readdir(`./files`, function(err,files){
        res.render('index',{ files: files});
        });
})
app.get("/files/:filename",function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err,filedata){
          res.render('show', {filename: req.params.filename, filedata:filedata});
    });
});
app.get("/edit/:filename",function(req,res){
    res.render('edit',{filename: req.params.filename});
});
app.post("/edit",function(req,res){
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
        res.redirect("/")
    });
});

app.post("/create", function(req,res){
    fs.writeFile(`./files/${req.body.title.split('').join('')}.txt`, req.body.details, function(err){
        res.redirect("/")
    });
})




app.listen(3000,function(){
})