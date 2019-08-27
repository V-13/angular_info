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
    uname:String,
    pass1:String,
    pass2:String

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
            throw error;
            res.send('error')
        }
        else
        {
            res.send("<script>alert('registration complete')</script>")
        }
    })
})






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


app.get('/searchinfo',(req,res)=>{
    res.render('searchinfo');
});

app.get('/searchAPI',(req,res)=>{
    var item=req.query.phone;
    var result=InfoModel.find({phone:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send('error')
        }
        else
        {
            res.send(data)
        }
    });
});


const APIurl2="https://angular-info.herokuapp.com/searchAPI"



app.post('/viewsingleinfo',(req,res)=>{
    var item=req.body.phone;
    request(APIurl2+"/?phone="+item,(error,response,body)=>{
        var data=JSON.parse(body);
        res.render('viewsingleinfo',{info:data});
    });

});
app.listen(process.env.PORT||3500,()=>{
    console.log("server running on 3500")
});