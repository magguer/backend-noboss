const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const roleAdminController = require("../../controllers/user/roleAdminController");

router.post("/", roleAdminController.store);
router.get("/", roleAdminController.index);
router.get("/:id", roleAdminController.show);
router.put("/:id", roleAdminController.update);
router.delete("/:id", roleAdminController.destroy);

router.use(
    checkJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
    })
);

module.exports = router;
