const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");
const clientController = require("../../controllers/business/clientController");

router.get("/", clientController.index);
router.get("/:id", clientController.show);
router.post("/", clientController.store);
router.patch("/:id/edit", clientController.update);
router.delete("/:id", clientController.destroy);

router.use(
    checkJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
    })
);


module.exports = router;