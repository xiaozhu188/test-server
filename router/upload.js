const Router = require("koa-router");
const uploadController = require("../controller/upload");
const router = new Router({
    prefix: "/api/upload",
});

router.post("/", uploadController.index);


module.exports = router;
