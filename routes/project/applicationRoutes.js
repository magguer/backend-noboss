const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const applicationController = require("../../controllers/project/applicationController");

router.get("/", applicationController.index);
router.get("/:slug", applicationController.show);
router.post("/", applicationController.store);
router.patch("/:id", applicationController.update);
router.delete("/:id", applicationController.destroy);

router.use(
    checkJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
    })
);


module.exports = router;
