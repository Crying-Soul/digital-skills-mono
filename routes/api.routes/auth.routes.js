const { Router } = require("express");
const authController = require("../../controllers/api.controllers/auth.controller.js");
const { check } = require("express-validator");
const router = new Router();

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
  authController.login
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
  authController.signup
);

module.exports = router;
