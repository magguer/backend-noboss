const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const projectController = require("../../controllers/project/projectController");

router.get("/", projectController.index);
router.get("/:slug", projectController.show);

router.use(
  checkJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  })
);

router.post("/", projectController.store);
router.patch("/:id", projectController.update);
router.delete("/:id", projectController.destroy);


module.exports = router;
