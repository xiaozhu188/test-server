const path = require("path");
const Koa = require("koa");
const app = new Koa();
const koaStatic = require("koa-static");
const koaBody = require("koa-body");
const koaJwt = require("koa-jwt");
const error = require("koa-json-error");
const views = require("koa-views");
const initRouter = require("./router");
const mongoose = require("mongoose");

initRouter(app);

app.use(error());

app.use(views(path.join(__dirname, "views/"), { extension: "ejs" }));

app.use(
    koaJwt({ secret: "shared" }).unless({
        path: [
            /^\/$/,
            /^\/api\/user\/login/,
            /^\/api\/user\/preview/,
            /^\/api\/upload/,
            /^\/api\/work/,
            // public里的静态文件
            /^\/upload/, 
            /^\/img/,
            /^\/favicon.ico/,
            /^\/preview.js/,
            /^\/engine_libs/,
        ],
    })
);

app.use(
    koaStatic(__dirname + "/public", {
        // 解决html2canvas图片跨域问题
        setHeaders: (res, path, stats) => {
            res.setHeader(
                "Access-Control-Allow-Origin",
                "*"
            );
            res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST");
            res.setHeader("Access-Control-Allow-Credentials", true);
        },
    })
);

app.use(
    koaBody({
        multipart: true,
        formidable: {
            uploadDir: path.join(__dirname, "public/upload/"), // 设置文件上传目录
            keepExtensions: true, // 保持文件的后缀
        },
    })
);

mongoose.connect(
    "mongodb+srv://xiaozhu:jinbao188@cluster0.mkdrs.mongodb.net/test?retryWrites=true&w=majority",
    function(err) {
        if (!err) {
            console.log("数据库连接成功");
        }
    }
);

app.listen(3000);
