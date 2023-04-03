const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const projectController = require("../../controllers/project/projectController");

router.get("/", projectController.index);
router.get("/:slug", projectController.show);
router.post("/", projectController.create);
router.patch("/:id", projectController.update);
router.delete("/:id", projectController.destroy);

router.use(
  checkJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  })
);


module.exports = router;
