const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const noboxController = require("../../controllers/business/noboxController");

router.get("/", noboxController.index);
router.get("/:id", noboxController.show);
router.post("/", noboxController.store);
router.patch("/:id/edit", noboxController.update);
router.delete("/:id", noboxController.destroy);

router.use(
    checkJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
    })
);


module.exports = router;