const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('Connected to Mongo'))
.catch(err=>console.log(err));



let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === 'audio/mpeg') {
          cb(null, 'uploads/songs')
        } else if (file.mimetype === 'image/jpeg'|| file.mimetype ==='image,png') {
          cb(null, 'uploads/images')
        } else if (file.mimetype === 'video/mp4') {
            cb(null, 'uploads/videos')
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            cb(null, 'uploads/files')
        } else {
          console.log(file.mimetype)
          cb({ error: 'Mime type not supported' })
        }
      },
      filename: (req, file, cb)=>{
          cb(null, req.body.name);
      }
});

let upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
    res.status(200).json("File has ben uploaded")
});

var MorganCustom = require('./config/morganCustom');
app.use(MorganCustom.morganMiddlewareConsole);
app.use(MorganCustom.morganMiddlewareLogFile);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.listen("5000", ()=>{
    console.log("Backend is running");
})