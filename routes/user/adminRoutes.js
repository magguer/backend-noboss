const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const adminController = require("../../controllers/user/adminController");

router.post("/token", adminController.token);
router.post("/", adminController.store);
router.get("/", adminController.index);
router.get("/:id", adminController.show);
router.put("/:id", adminController.update);
router.delete("/:id", adminController.destroy);

router.use(
  checkJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  })
);

module.exports = router;
