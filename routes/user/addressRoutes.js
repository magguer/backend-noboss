const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const addressontroller = require("../../controllers/user/addressController");

router.post("/", addressontroller.store);
router.get("/", addressontroller.index);
router.get("/:id", addressontroller.show);
router.put("/:id", addressontroller.update);
router.delete("/:id", addressontroller.destroy);

router.use(
    checkJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
    })
);

module.exports = router;
