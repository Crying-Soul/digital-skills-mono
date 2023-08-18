const express = require("express");
const { engine } = require("express-handlebars");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const userRouter = require("../routes/user.routes");
const authRouter = require("../routes/api.routes/auth.routes");

module.exports = class Server {
  constructor(port = process.env.port || 8081) {
    this.port = port;
    this.app = express();
    this.sessLifeTime = 1000 * 60 * 60 * 4;
  }

  setup() {
    this.app.engine(".hbs", engine({ extname: ".hbs" }));
    this.app.set("view engine", ".hbs");
    this.app.set("views", "./views");
    this.app.use(express.static("views"));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
   
    this.app.use(session({
      secret: 'digital-skills',
      resave: false,
      saveUninitialized: true
    }))
  }

  start() {
    this.setup();
    this.app.use("/user", userRouter);
    this.app.use("/user/auth", authRouter);
    this.app.listen(this.port, () => {
      console.log(`Server started at http://127.0.0.1:${this.port}`);
    });
  }
};
