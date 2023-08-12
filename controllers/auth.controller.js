require("dotenv").config();
const jwt = require("jsonwebtoken");
const BaseController = require("./base.controller");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

class AuthController extends BaseController {
  async login(req, res) {
    try {
      const validator = validationResult(req);

      const { email, password } = req.body;
      if (!validator.isEmpty()) {
        super.sendError(400, validator, res);
        return;
      }
      const user = await User.findOne(email);

      if (!user) {
        validator.errors.push({
          msg: "Such user doesn't exists",
          path: null,
          value: null,
        });
      } else if (!(await bcrypt.compare(password, user.password))) {
        validator.errors.push({
          msg: "Incorrect password",
          path: null,
          value: null,
        });
      } else {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        await User.updateToken(user.email, token);
        res.status(201).json({ token: token });
        return;
      }

      super.sendError(400, validator, res);
    } catch (error) {
      res
        .status(500)
        .json([{ msg: "Internal server error" }, { dev_msg: error }]);
    }
  }
  async signup(req, res) {
    try {
      const { name, email, password } = req.body;
      const validator = validationResult(req);
      if (!validator.isEmpty()) {
        super.sendError(400, validator, res);
        return;
      }

      console.log(await User.isUserExists(email));

      if (await User.isUserExists(email)) {
        validator.errors.push({
          msg: "Such user already exists",
          path: null,
          value: null,
        });
      } else {
        const user = await User.createUser(
          name,
          email,
          await bcrypt.hash(password, 11)
        );
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        await User.updateToken(user.email, token);
        res.status(201).json({ token: token });
        return;
      }

      super.sendError(400, validator, res);
    } catch (error) {
      res
        .status(500)
        .json([{ msg: "Internal server error" }, { dev_msg: error }]);
    }
  }
}

module.exports = new AuthController();
