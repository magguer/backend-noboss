const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const productController = require("../../controllers/business/productController");

router.get("/", productController.index);
router.get("/:slug", productController.show);
router.post("/", productController.store);
router.patch("/:id", productController.update);
router.delete("/:id", productController.destroy);

router.use(
  checkJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  })
);


module.exports = router;