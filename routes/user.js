const { Router } = require("express");
const router = Router();
const { signup_post } = require("../controllers/userController");

router.post("/signup", signup_post);

module.exports = router;
