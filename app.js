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


const InfoModel=Mongoose.model("infodetails",{
    name:String,
    email:String,
    message:String,
    phone:String

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

const APIurl1="http://localhost:3500/viewAPI"

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


const APIurl2="http://localhost:3500/searchAPI"



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