const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const { storeReturnTo } = require("../middleware");
const users = require("../controllers/users");

//GET: render registration form && POST: route to register
router
  .route("/register")
  .get(users.renderRegisterForm)
  .post(catchAsync(users.createUser));

//GET: render login form && POST: route to login redirect
router
  .route("/login")
  .get(users.renderLoginForm)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.redirectLogin
  );

//redirect route for logout
router.get("/logout", users.redirectLogout);

module.exports = router;
