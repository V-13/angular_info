const Express = require('express')
const Mongoose=require('mongoose')
var app=new Express();
app.set('view engine','ejs');
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var request=require('request')
Mongoose.connect("mongodb+srv://V-13:vivek@cluster0-bgs7t.mongodb.net/studentdb1?retryWrites=true&w=majority")
// Mongoose.connect("mongodb://localhost:27017/infodb");
app.use(Express.static(__dirname+"/public"));

// For CORS,Pgm Line no 12 to 29
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const InfoModel=Mongoose.model("infodetails",{
    name:String,
    email:String,
    message:String,
    phone:String

})


const RegModel=Mongoose.model("regdetails",{
    name:String,
    address:String,
    gender:String,
    district:String,
    place:String,
    mobile:String,
    email:String,
    uname:String,                  //registration question cheyyan vendi create cheytha model.
    pass1:String,
    pass2:String

})



const StudentModel=Mongoose.model("studentidcard",{
    name:String,
    roll:String,
    adm:String,                 //for Angular project student Management System created. 
    branch:String,
    email:String
})


app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/read',(req,res)=>{
    var Info=InfoModel(req.body);                  //database leku data add cheyyunnu.
    var result=Info.save((error,data)=>{
        if(error)
        {
            throw error;
            res.send('error')
        }
        else
        {
            res.send("<script>alert('information about student successfully added'</script><script>window.location.href='/'</script>")
        }
    });
});

app.post('/read1',(req,res)=>{
    var reg=RegModel(req.body);
    var result= reg.save((error,data)=>{
        if(error)
        {
            throw error;                                    //registration  question read  api
            res.send('error')
        }
        else
        {
            res.send("<script>alert('registration complete')</script>")
        }
    })
})

app.post('/read2',(req,res)=>{
    var Info=StudentModel(req.body);                  //Student management system
    var result=Info.save((error,data)=>{
        if(error)
        {
            throw error;
            res.send('error')
        }
        else
        {
            res.send("<script>alert('information about student successfully added'</script><script>window.location.href='/'</script>")
        }
    });
});




app.get('/viewAPI',(req,res)=>{
    var result=InfoModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send('error')
        }
        else
        {
            res.send(data);
        }
    });
});

const APIurl1="https://angular-info.herokuapp.com/viewAPI"

app.get('/viewinfo',(req,res)=>{
    request(APIurl1,(error,response,body)=>{
        var data =JSON.parse(body);
        res.render('viewinfo',{info:data})
    });
});


app.get('/viewAPI1',(req,res)=>{
    var result=RegModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send('error')
        }                                                 //registration view API
        else
        {
            res.send(data);
        }
    });
});


const APIurl3="https://angular-info.herokuapp.com/viewAPI1" //registration view API

app.get('/viewAPI2',(req,res)=>{
    var result=StudentModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send('error')
        }                                                 //student Management system
        else
        {
            res.send(data);
        }
    });
});



const APIurl4="https://angular-info.herokuapp.com/viewAPI2" //student Management system







app.get('/viewregistration',(req,res)=>{
    request(APIurl3,(error,response,body)=>{
        var data =JSON.parse(body);
        res.render('viewregistration',{info:data})
    });
});







app.get('/searchinfo',(req,res)=>{
    res.render('searchinfo');
});

app.post('/searchAPI',(req,res)=>{
    var item=req.body.phone;
    var result=InfoModel.find({phone:item},(error,data)=>{
        if(error)                                                 //contact us nte search api
        {
            throw error;
            res.send(error)
        }
        else
        {
            res.send(data)
        }
    });
});


const APIurl2="https://angular-info.herokuapp.com/searchAPI"

app.post('/deleteAPI',(req,res)=>{
    var item=req.body._id;
    var result=InfoModel.deleteOne({_id:item},(error,data)=>{
        if(error)                                                 //contact us nte delete api
        {
            throw error;
            res.send(error)
        }
        else
        {
            res.send(data)
        }
    });
});


app.post('/userupdate',(req,res)=>{
    const x =req.body._id;
    const Name=req.body.name;
    const Email =req.body.email;
    const Message=req.body.message;
    const Phone =req.body.phone;
    console.log(x);
    var result = DataModel.update({_id:x},{$set:{name:Name,email:Email,message:Message,phone:Phone}},(error,data)=>{
        if(error){
            throw error;
            res.send(error);
        }
        else{
            res.send(data);
        }
    });
});







const APIurl6="https://angular-info.herokuapp.com/deleteAPI"
















// app.get('/searchAPI1',(req,res)=>{
//     var item=req.query.phone;
//     var result=RegModel.find({data:item},(error,data)=>{
//         if(error)
//         {
//             throw error;                                   // Search Api for registration question  
//             res.send('error')
//         }
//         else
//         {
//             res.send(data)
//         }
//     });
// });


// const APIurl5="https://angular-info.herokuapp.com/searchAPI1"     //search api for registarion question









app.post('/viewsingleinfo',(req,res)=>{
    var item=req.body.phone;
    console.log(x);
    request(APIurl2+"/?phone="+item,(error,response,body)=>{
        var data=JSON.parse(body);
        res.render('viewsingleinfo',{info:data});
    });

});







app.listen(process.env.PORT||3500,()=>{
    console.log("server running on 3500")
});