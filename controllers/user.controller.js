require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const session = require("express-session");
const { validationResult } = require("express-validator");

class UserController {
  async login(req, res) {
    try {
      if (req.body.email) {
        const { email, password } = req.body;
        console.log(email, password);

        const validator = validationResult(req);

        if (!validator.isEmpty()) {
          res.render("login", { error: validator.errors.shift() });
          return;
        }
        const user = await User.findOne(email);
        console.log(user);

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
          
         
          req.session.regenerate(function (err) {
            if (err) next(err)
            req.session.user = user
            req.session.token = token;
            req.session.save(function (err) {
              if (err) return next(err)
               res.redirect('/user/profile');
            });
          });
          return;

     
          
        }
        res.render("login", { error: validator.errors.shift() });
        return;
      }

      res.render("login");
    } catch (error) {
      console.log(error);
      res.render("index");
      return;
    }
  }

  async signup(req, res) {
    try {
      if (req.body.email) {
        const { name, email, password } = req.body;
        const validator = validationResult(req);
        if (!validator.isEmpty()) {
          res.render("signup", { error: validator.errors.shift() });
          return;
        }

        // console.log(await User.isUserExists(email));

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
          req.session.regenerate(function (err) {
            if (err) next(err)
            req.session.user = user
            req.session.token = token;
            req.session.save(function (err) {
              if (err) return next(err)
               res.redirect('/user/profile');
            });
          });
          return;
        }

        res.render("signup", { error: validator.errors.shift() });
      }
      res.render("signup");
    } catch (error) {
      console.log(error);
      res.render("index");
      return;
    }
  }

  async profile(req, res) {
    try {
      const token = req.session.token;
      if (!token) {
        res.status(401).render("index");
        return;
      }
      const user = await User.findByToken(token);
      console.log(user);
      if (!user) {
        res.status(401).render("index");
        return;
      }
      res.render("profile", { user: user });
    } catch (error) {
      console.log(error);
      res.render("index");
      return;
    }
  }
}

module.exports = new UserController();
