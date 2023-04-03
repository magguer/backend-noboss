const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const bookingController = require("../../controllers/payment/bookingController");

router.get("/", bookingController.index);
router.get("/:id", bookingController.show);
router.post("/", bookingController.store);
router.patch("/:id", bookingController.update);
router.delete("/:id", bookingController.destroy);

router.use(
    checkJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
    })
);


module.exports = router;
