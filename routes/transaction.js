const { Router } = require("express");
const router = Router();

const transactionController = require("../controllers/transactionController");

router.get("/", transactionController.index);
router.get("/:id", transactionController.show);

module.exports = router;
