const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const subcategoryController = require("../../controllers/business/subcategoryController");

router.get("/", subcategoryController.index);
router.get("/:id", subcategoryController.show);
router.post("/", subcategoryController.store);
router.patch("/:id/edit", subcategoryController.update);
router.delete("/:id", subcategoryController.destroy);

router.use(
    checkJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
    })
);


module.exports = router;
