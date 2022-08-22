const express = require("express");
const router = require("./routes");
const app = express();
const port = 3000;
const { sequelize } = require("./models");
// sequelize.sync({ force: true });

app.use(express.json());
app.use("/", router);



app.use("/", express.urlencoded({ extended: false }), router);


app.listen(port, () =>{
    console.log(port, "포트로 서버가 열렸어요...")
})