const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");
const https = require("https");
const { futimes } = require("fs");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    
    const data ={
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    }

    const jsondata = JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/11975286c4";
    const options = {
        method:"POST",
        auth:"Nabil:f6e8b3afc5420ca0993ba9551d83dcb-us21"

    }
   const request= https.request(url,options,function(response){
     if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
     } else {
        res.sendFile(__dirname+ "/failure.html");
     }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata);
    request.end();
})


app.post("/failure",function(req,res){
      res.redirect("/");
})




app.listen(process.env.PORT ||3000,function(){
    console.log("Server is running on Port 3000");
})
// Api key
// df6e8b3afc5420ca0993ba9551d83dcb-us21

// Unique Id
// 11975286c4

// Create account on glitch

// 2. Click on new project

// 3. Select the glitch-hello-node

// 4.Change the package.json dependencies in this project we added express,body-parser and request just add the name same as on our local project

// 5.add our app.js signup,sucess,faliure html files and css file

// 6.for easy method you can rename app.js to server.js

// 7.On the log you can see that server running in 3000 that means every thing fine.

// 8.On share button you can see live server link paste on url your site will be hosted