const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const categoryController = require("../../controllers/business/categoryController");

router.get("/", categoryController.index);
router.post("/", categoryController.store);
router.get("/:name", categoryController.show);
router.patch("/:id", categoryController.update);
router.delete("/:id", categoryController.destroy);

router.use(
    checkJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
    })
);

module.exports = router;