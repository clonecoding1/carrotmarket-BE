const express = require("express");
const router = require("./routes");
// const http = require("http");
// const fs = require("fs");
const app = express();
const port = 3000;
const cors = require("cors");
const { sequelize } = require("./models");

//  sequelize.sync({ force: true });

app.use(express.json());
app.use(cors());

  const whitelist = ["http://localhost:3000","http://somfist.shop.s3-website.ap-northeast-2.amazonaws.com","http://somfist.shop/" ];
 



const corsOptions = {
    origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
    callback(null, true);
    } else {
    console.log(origin);
    callback(new Error("NOT_ALLOWED_ORIGIN"));
    }
    },
    };


app.use("/", express.urlencoded({ extended: false }), router);
app.use(cors(corsOptions));

app.listen(port, () =>{
    console.log(port, "포트로 서버가 열렸어요...")
})