const WorkModel = require("../model/work");
const Vue = require("vue");
exports.test = async (ctx, next) => {
    const works = await WorkModel.find();
    ctx.body = {
        data: works,
    };
};

exports.find = async (ctx, next) => {
    const works = await WorkModel.find();
    ctx.body = {
        data: works,
    };
};

exports.findById = async (ctx, next) => {
    let id = ctx.request.query.id;
    const works = await WorkModel.findById({ _id: id });
    ctx.body = {
        data: works,
    };
};

exports.create = async (ctx, next) => {
    const work = {
        author: "xiaozhu",
    };
    const newWork = await new WorkModel(work).save();
    ctx.body = {
        data: newWork,
    };
};

exports.save = async (ctx, next) => {
    const newWork = await WorkModel.findByIdAndUpdate(
        ctx.params.id,
        ctx.request.body
    );
    ctx.body = {
        data: newWork,
        preview: ctx.request.body.coverImg
            ? `${ctx.origin}/api/work/preview/${newWork._id}`
            : "",
    };
};

exports.preview = async (ctx, next) => {
    let _pageData = await WorkModel.findById(ctx.params.id);
    // 创建渲染器
    const renderer = require("vue-server-renderer").createRenderer();
    const sguoyi = require("../public/engine_libs/sguoyi.umd")
        .default;
    Vue.use(sguoyi);
    const app = new Vue({
        data: {
            componentData: _pageData.content.componentData,
            canvasStyleData: _pageData.content.canvasStyleData,
            pageSetting: _pageData.content.pageSetting,
        },
        computed: {
            pageStyles() {
                return {
                    backgroundImage:
                        "url(" + this.pageSetting.backgroundImage + ")",
                    backgroundSize: this.pageSetting.backgroundSize,
                    backgroundRepeat: this.pageSetting.backgroundRepeat,
                    backgroundPosition: this.pageSetting.backgroundPosition,
                    width: this.canvasStyleData.width + "px",
                    height: this.canvasStyleData.height + "px",
                    position: "relative",
                    margin: "auto",
                };
            },
        },
        methods: {
            getStyle(style, filter = []) {
                const needUnit = [
                    "fontSize",
                    "width",
                    "height",
                    "top",
                    "left",
                    "borderWidth",
                    "letterSpacing",
                    "borderRadius",
                ];

                const result = {};
                Object.keys(style).forEach(key => {
                    if (!filter.includes(key)) {
                        if (key != "rotate") {
                            result[key] = style[key];

                            if (needUnit.includes(key)) {
                                result[key] += "px";
                            }
                        } else {
                            result.transform = key + "(" + style[key] + "deg)";
                        }
                    }
                });

                return result;
            },
        },
        template: `<div id="app">
                    <section style="height: 100vw;background-color: #fcfdfd">
                        <div
                            id="editor"
                            :style="{
                                ...pageStyles,
                            }"
                        >
                            <div v-for="(item, index) in componentData" :key="index" class="shape">
                                <component class="component" :is="item.component" :style="getStyle(item.style)" v-bind="{...item.propValue}" />
                            </div>
                        </div>
                    </section>
                </div>`,
    });

    // 生成预渲染的HTML字符串.  如果没有传入回调函数，则会返回 promise，如下代码
    try {
        const html = await renderer.renderToString(app);
        const str = JSON.stringify(_pageData);
        ctx.status = 200;
        ctx.body = `
          <!DOCTYPE html>
          <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>作品预览</title>
                <style>
                * {
                    margin: 0;
                    padding: 0;
                }
                .component {
                    position: absolute;
                }
            </style>
            </head>
            <body>${html}</body>
            <script>
            
            window._pageData = '${str}'
            </script>
            <script src="/preview.js"></script>
          </html>
        `;
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = "服务器错误";
    }
};
