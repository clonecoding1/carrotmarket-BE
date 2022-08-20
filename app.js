const express = require("express");
const router = require("./sever/routes");
const app = express();
const port = 3000;

app.use("/api", router);
app.use(express.json());
app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요...");
});
