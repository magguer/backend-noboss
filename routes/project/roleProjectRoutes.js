const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const roleProjectController = require("../../controllers/project/roleProjectController");

router.get("/", roleProjectController.index);
router.get("/:id", roleProjectController.show);
router.post("/", roleProjectController.store);
router.patch("/:id", roleProjectController.update);
router.delete("/:id", roleProjectController.destroy);

router.use(
    checkJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
    })
);


module.exports = router;
