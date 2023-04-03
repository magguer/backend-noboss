const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const statusController = require("../../controllers/payment/statusController");

router.get("/", statusController.index);
router.get("/", statusController.store);
router.get("/:id", statusController.show);
router.get("/:id", statusController.update);
router.get("/:id", statusController.destroy);

router.use(
    checkJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
    })
);


module.exports = router;