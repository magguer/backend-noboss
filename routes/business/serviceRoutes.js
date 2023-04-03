const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const serviceController = require("../../controllers/business/serviceController");

router.get("/", serviceController.index);
router.get("/:id", serviceController.show);
router.post("/", serviceController.store);
router.patch("/:id/edit", serviceController.update);
router.delete("/:id", serviceController.destroy);

router.use(
    checkJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
    })
);


module.exports = router;
