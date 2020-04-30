const express = require("express");
const app =express();

app.use(express.json());


const mongoose = require("mongoose");
mongoose.connect("mongodb://Mays:maysmlab1@ds363118.mlab.com:63118/atm-db").then(()=>console.log("connected to the database ^_^"))
.catch(err =>console.error("Connection Faild!"));


const atmSchema = new mongoose.Schema({
    name: {type: String , required: true , minlength: 2 , maxlength: 10},
    location: String,
    creationDate: {type: Date ,default: Date.now}
});

const AtmCollection2 = mongoose.model("AtmCollection2",atmSchema);

/*
AtmCollection2.create({
    atmName: "A1",
    location: "Erbil"
},function(error,data){
    if(error){
        console.log(error);
    }else{
        console.log("Successful!");
    }
});
*/

app.get("/api/atms/:id", (req, res) => {
    const atm = AtmCollection2.findById(req.params.id)
    if (!atm) return res.status(404).send('The ATM with the specific ID is not found!!');
    res.send(atm);
  });


app.get("/api/atms",async (req,res)=>{
    const allAtms = await AtmCollection2.find();
    res.send(allAtms);
});


app.post("/api/atms",async(req,res)=>{
    const allAtms = await new AtmCollection2({name : req.body.name});
    allAtms.save();
    res.send(allAtms);
});

app.put("/:id",async(req,res)=>{
    const atm = await AtmCollection2.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
    
    if (!atm) return res.status(404).send('The ATM with the specific ID is not found!');
    res.send(atm)
});

app.delete("/:id",async(req,res)=>{
    const atm =await AtmCollection2.findByIdAndRemove(req.body.name);
    if (!atm) return res.status(404).send('The ATM with the specific ID is not found!');
    res.send(atm)
});

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening to ${port}...`));
  


