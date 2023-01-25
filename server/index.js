const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const app = express();

const Recep = require("./model/reception");
const Docrecep = require("./model/docreg");
const Secret = "jwtsecret";

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://sinchana:sinch7@cluster0.cd2wqmb.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to DB");
  })
  .catch(() => {
    console.log("Error connecting to Database");
  });

/////////////////////////////////////////////sql/////////////////////////////////////////////////////////////////////

const Client = require("pg").Pool;

const client = new Client({
  user: "sinchana",
  host: "db.bit.io",
  database: "sinchana/Smartpresc",
  password: "v2_3y7dQ_n5YVXwG4GJJ26C2EFPv8umu",
  port: 5432,
  ssl: true,
});

app.get("/sql", async (req, res) => {
  // res.send("SQL");

  let idi = 0;
  let data = {
    id: idi,
  };
  try {
    const id = await client.query(
      `select * from id order by did desc `,
      (err, result) => {
        if (err) {
          console.log("ERROR FETCHING ID");
        } else {
          idi = result.rows[0].did;
          client.query(`insert into id values($1)`, [idi + 1]);
        }
      }
    );
    res.status(200).send("OK");
  } catch (err) {
    res.send(err);
  }
});

app.post("/store",async (req,res)=>{
  const date=req.body.date;
  const description=req.body.description;
 const  hospital=req.body.hospital;
  const disease=req.body.disease;
  const dat={
    date:date,
    description:description,
    hospital:hospital,
    disease:disease
  }
  try {
    client.query(
      `insert into prescription values($1,$2,$3,$4,$5)`,[5,dat.hospital,dat.date,dat.disease,dat.description]);
      // `insert into prescription values($1,$2,$3,$4,$5)`,[2,'sdf','sdf','sdf','asdf']);
    res.status(200).send("OK");
  } catch (err) {
    res.send(err);
  }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const verifyJwt = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Sorry bro no token");
  } else {
    jwt.verify(token, Secret, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "U fail to auth bro " });
        console.log("notauthorised");
      } else {
        console.log("authorsed");
        req.userId = decoded.id;
        next();
      }
    });
  }
};
app.get("/", (req, res) => {
  res.send("Server is not crashed");
});
app.get("/isUserAuth", verifyJwt, (req, res) => {
  res.json({ auth: true });
});

app.post("/login", async (req, res) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;
  // console.log(username);
  // console.log("received");
  const User = await Recep.findOne({ username });
  const Passwordcorrect =
    User === null ? false : await bcrypt.compare(password, User.password);
  if (!(User && Passwordcorrect)) {
    return res.status(401).json({
      error: "invalid Username or Password",
    });
  } else {
    const username = User.username;
    const token = jwt.sign({ username }, Secret, { expiresIn: 10000 });
    res.json({ auth: true, token: token, user: User });
  }
});

app.post("/regesterr", async (req, res) => {
  const saltRounds = 10;
  const username = req.body.username.toLowerCase();
  const password = req.body.password;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  console.log(username + password);
  const Users = await Recep.findOne({ username });
  // const Passwordcorrect =
  //   User === null ? false : await bcrypt.compare(password, User.password);
  // console.log("USERS" + Users);

  if (Users === null) {
    console.log("Not found biro");
    console.log("Request received");
    const Recep1 = new Recep({
      username: username,
      password: passwordHash,
    });
    console.log(Recep1);
    console.log("SERVER END");
    Recep1.save();
    const token = jwt.sign({ username }, Secret, { expiresIn: 800 });
    console.log(token);
    res.json({ auth: true, token: token });
  } else {
    console.log("already present");
    res.send(false);
  }
});

app.post("/docreg", async (req, res) => {
  const saltRounds = 10;
  const username = req.body.username;
  // const password = req.body.password;
  // const email = req.body.email;
  const Specializationd = req.body.specialization;
  const description = req.body.description;
  const date = req.body.date;
  // const rating = req.body.rating;
  // const passwordHash = await bcrypt.hash(password, saltRounds);
  // console.log(username);
  // console.log(email);
  // console.log(Specializationd);

  // await Docrecep.find({ email: email }, async (err, result) => {
  //   console.log("Result from the DB" + result);
  //   if (err) {
  //     console.log(err);
  //   } else {
      
  //   }
  // })
  //   .clone()
  //   .catch(function (err) {
  //     console.log(err);
  //   });
  // // console.log(req.body);
  if (true) {
    const dat = new Docrecep({
      username: username,
      // password: passwordHash,
      // email: email,
      specialization: Specializationd,
      description: description,
      date: date,
      // rating: rating,
    });
    console.log(dat);
    dat.save();
    res.send(true);
  } 
});

app.get("/doctors", (req, res) => {
  Docrecep.find({}).then((dat) => {
    res.send(dat);
  });
});

app.post("/doctors/search", (req, res) => {
  const user = req.body.username;

  Docrecep.find({ username: req.body.username }, (err, data) => {
    if (data.length == 0) {
      res.send(false);
    } else {
      res.send(data);
    }
  });
});

app.get("/deletedoc", (req, res) => {
  const email = req.body.username;
  console.log(email);
  Docrecep.deleteMany({ username: email }).then((result) => {
    res.send("done");
  });
});
app.get("/android", (req, res) => {
  res.send("Congo Bro");
});
///storage
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now + file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single("testImage");

////////////

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newImage = new imageModel({
        name: req.body.name,
        image: {
          data: req.file.filename,
          contentType: "image/png",
        },
      });
      newImage
        .save()
        .then(() => res.send("DONE UPLOAD"))
        .catch((e) => {
          console.log("ERROR UPLOAD");
        });
    }
  });
});
app.get("/getupload", (req, res) => {
  imageModel.find({ name: "testImage" }, (err, data) => {
    res.send(data);
  });
});

const imageModel = require("./model/Image_model");
app.get("/upload", (req, res) => {
  res.send("UPLOAD IMAGE");
});

app.listen(7000 || process.env.PORT, function () {
  console.log(`Server started on port 7000 `);
});
