const express = require("express");
const router = require("./routes");
// const http = require("http");
// const fs = require("fs");
const app = express();
const port = 3000;
const cors = require("cors");
const { sequelize } = require("./models");
 //sequelize.sync({ force: true });

app.use(express.json());
app.use(cors());

// const whitelist = ["http://localhost:3000" ];
// const whitelist = ["http://prac-ye.s3-website.ap-northeast-2.amazonaws.com"];


// const corsOptions = {
//     origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//     callback(null, true);
//     } else {
//     console.log(origin);
//     callback(new Error("NOT_ALLOWED_ORIGIN"));
//     }
//     },
//     };
//여기서 부터 롱 폴링
// const pool = [];
// function handlePoll(req,res) {
//     pool.push(res);
// };

// function handlePage(req,res){
//     fs.createReadStream(__dirname + "/client.html").pipe(res);
// };

// function emitMessage(message){
//     for(let res of pool) res.end(message);
//     pool.length = 0;
// };

// function handleMessage(req,res){
//     let message = "";
//     req.on("data", (chunk)=> {
//         message += chunk;
//     });
//     req.on("end", ()=> {
//         emitMessage(message);
//         res.end();
//     });
// };
// http
//     .createServer((req,res)=> {
//     let method = req.method;
//     let url = req.url;
//     if(method === "GET") {
//         if(url === "/page") handlePage(req,res);
//         else if (url === "/poll") handlePoll(req,res);
//     } else if (method === "POST" && url === "/message") handleMessage(req,res);
//     else req.end();
//     });
//     .listen(3000)
//     .on("listening", ()=>{
//         console.log("I am listening on port 3000")
//     });

app.use("/", express.urlencoded({ extended: false }), router);
// app.use(cors(corsOptions));

app.listen(port, () =>{
    console.log(port, "포트로 서버가 열렸어요...")
})