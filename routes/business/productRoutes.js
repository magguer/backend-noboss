const express = require("express");
const router = express.Router();
const projectPermissions = require("../../middlewares/projectPermissions")
const { expressjwt: checkJwt } = require("express-jwt");
const productController = require("../../controllers/business/productController");


router.use(
  checkJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  })
);

router.use(projectPermissions)
router.get("/", productController.index);
router.get("/:id", productController.show);
router.post("/", productController.store);
router.patch("/:id", productController.update);
router.delete("/:id", productController.destroy);


module.exports = router;