const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const movementController = require("../../controllers/business/movementController");

router.use(
    checkJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
    })
);

router.get("/", movementController.index);
router.post("/", movementController.store);
router.get("/:name", movementController.show);
router.patch("/:id", movementController.update);
router.delete("/:id", movementController.destroy);

module.exports = router;