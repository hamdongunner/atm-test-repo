const express = require("express");
const app =express();

app.use(express.json());


const mongoose = require("mongoose");
mongoose.connect("mongodb://Mays:maysmlab1@ds363118.mlab.com:63118/atm-db").then(()=>console.log("connected to the database ^_^"))
.catch(err =>console.error("Connection Faild!"));


const atmSchema = new mongoose.Schema({
    name: {type: String , required: true , minlength: 2 , maxlength: 10},
    creationDate: {type: Date ,default: Date.now},
    haveCash: Boolean,
    working: Boolean,
    country: String,
    city: String,
    address: String,
    loc: {
        type: String,
        coordinates: [Number]
  }
});

const AtmCollection2 = mongoose.model("AtmCollection2",atmSchema);

/*
AtmCollection2.create({
    name: "A1",
    haveCash: "yes",
    working: "yes",
    country: "Iraq",
    city: "Baghdad",
    address: "Ziyona",
    loc: {
        type: "Point",
        coordinates:  [ 33.3221,//latitude 44.4512 //longitude ]
    }},function(error,data){
    if(error){
        console.log(error);
    }else{
        console.log("Successful!");
    }
});
*/

app.get("/api/singleAtm/:id", (req, res) => {
    const singleAtm = AtmCollection2.findById(req.params.id);
    if (!singleAtm) return res.status(404).send("The ATM with the specific ID is not found!!");
    res.send(singleAtm);

  });


app.get("/api/atms",async (req,res)=>{
    const allAtms = await AtmCollection2.find();
    res.send(allAtms);
});


app.post("/api/Newatm",async(req,res)=>{
    const allAtms = new AtmCollection2({name: req.body.name,
        haveCash: req.body.haveCash,
        working: req.body.working,
        country: req.body.country,
        city: req.body.city,
        address: req.body.address,
        loc: {
            type: req.body.type,
            coordinates: [req.body.latitude, req.body.longitude]
        }

    });
    allAtms.save();
    res.send(allAtms);
});

app.put("/updateAtm/:id",async(req,res)=>{
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
  


