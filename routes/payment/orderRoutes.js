const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const orderController = require("../../controllers/payment/orderController");

router.get("/", orderController.index);
router.get("/:id", orderController.show);
router.post("/", orderController.store);
router.patch("/:id", orderController.update);
router.delete("/:id", orderController.destroy);

router.use(
  checkJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  })
);


module.exports = router;
