// init project
let express = require("express");
let mongo = require("mongodb");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let app = express();

// Install & Set up mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
let cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 }));

//  Mount the body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//  Serve static files
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

//Mongo db variables of the third challenge
// Create a 'Shorter' Model
let actorSchema = new mongoose.Schema({
  name: String,
  picture: String
});

// Create a Shorter
let Actor = mongoose.model("Actor", actorSchema);

//  API endpoint for the third challenge.
app.get("/api/actors", function(req, res) {
  console.log(req)
  Actor.find().exec((err, docs) => {
    if (err) return console.error(err);
    res.json({
      ...docs
    });
  });
});

app.get("/api/actors/new", function(req, res) {
  
  let { name, picture } = req.query;
  let newActor = new Actor({
    name: name,
    picture: picture
  });
  newActor.save((err, docs) => {
    if (err) return console.error(err);
    res.json({
      res: "done"
    });
  });
});

// listen for requests :)
let listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
