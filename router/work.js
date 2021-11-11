const Router = require("koa-router");
const workController = require("../controller/work");
const router = new Router({
    prefix: "/api/work",
});

router.get("/", workController.find);
router.get("/findById", workController.findById);
router.post("/create", workController.create);
router.put("/save/:id", workController.save);
router.get("/preview/:id", workController.preview);

module.exports = router;
