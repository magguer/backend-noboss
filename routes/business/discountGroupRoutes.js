const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const discountGroupController = require("../../controllers/business/discountGroupController");

router.get("/", discountGroupController.index);
router.get("/:id", discountGroupController.show);
router.post("/", discountGroupController.store);
router.patch("/:id/edit", discountGroupController.update);
router.delete("/:id", discountGroupController.destroy);

router.use(
    checkJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
    })
);


module.exports = router;