const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const headingController = require("../../controllers/project/headingController");

router.get("/", headingController.index);
router.get("/:slug", headingController.show);
router.post("/", headingController.store);
router.patch("/:id", headingController.update);
router.delete("/:id", headingController.destroy);

router.use(
    checkJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
    })
);


module.exports = router;
