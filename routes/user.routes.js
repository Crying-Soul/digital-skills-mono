const { Router } = require("express");
const userController = require("../controllers/user.controller.js");
const { check } = require("express-validator");
const router = new Router();

/**
 * Get requests
 */
router.get(
  "/",
  function (req, res, next) {
    if (req.session.token) {
      return res.redirect("/user/profile");
    }
    next();
  },
  userController.login
);
router.get(
  "/login",
  function (req, res, next) {
    if (req.session.token) {
      return res.redirect("/user/profile");
    }
    next();
  },
  userController.login
);
router.get(
  "/signup",
  function (req, res, next) {
    if (req.session.token) {
      return res.redirect("/user/profile");
    }
    next();
  },
  userController.signup
);

router.get(
  "/profile",
  function (req, res, next) {
    console.log(req.session);
    if (!req.session.token) {
      return res.redirect("/user/login");
    }
    next();
  },
  userController.profile
);

/**
 * Post requests
 */
router.post(
  "/login",
  [
    check("email")
      .exists()
      .withMessage("Email must be provided")
      .isEmail()
      .withMessage("Incorrect Email")
      .not()
      .isEmpty()
      .withMessage("Email cannot be empty")
      .normalizeEmail(),
    check("password")
      .exists()
      .withMessage("Password must be provided")
      .not()
      .isEmpty()
      .withMessage("Password cannot be empty")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
      .withMessage(
        "Password must include one lowercase character, one uppercase character, a number, and a special character."
      ),
  ],
  userController.login
);

router.post(
  "/signup",
  [
    check("name")
      .exists()
      .withMessage("Name must be provided")
      .not()
      .isEmpty()
      .withMessage("Name cannot be empty")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 symbols"),

    check("email")
      .exists()
      .withMessage("Email must be provided")
      .isEmail()
      .withMessage("Incorrect Email")
      .not()
      .isEmpty()
      .withMessage("Email cannot be empty")
      .normalizeEmail(),
    check("password")
      .exists()
      .withMessage("Password must be provided")
      .not()
      .isEmpty()
      .withMessage("Password cannot be empty")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
      .withMessage(
        "Password must include one lowercase character, one uppercase character, a number, and a special character."
      ),
  ],
  userController.signup
);

module.exports = router;
