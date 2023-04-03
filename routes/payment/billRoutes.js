const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const billController = require("../../controllers/payment/billController");

router.get("/", billController.index);
router.get("/:id", billController.show);
router.post("/", billController.store);
router.patch("/:id/edit", billController.update);
router.delete("/:id", billController.destroy);

router.use(
  checkJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  })
);


module.exports = router;
