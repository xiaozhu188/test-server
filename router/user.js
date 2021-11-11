const Router = require("koa-router");
const userController = require("../controller/user");
const router = new Router({
    prefix: "/api/user",
});

router.get("/", async (ctx, next) => {
    ctx.body = 'user'
});

router.post("/login", userController.login);
router.get("/getUserInfo", userController.getUserInfo);
router.get("/authentication", userController.authentication);
router.get("/preview", userController.preview);

module.exports = router;
