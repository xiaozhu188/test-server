const jwt = require("jsonwebtoken");
const Vue = require("vue");

exports.login = async (ctx, next) => {
    // 省略登录流程
    const token = jwt.sign({ username: ctx.request.body.username }, "shared", {
        expiresIn: "1d",
    });
    ctx.state.username = ctx.request.body.username;
    ctx.body = {
        token,
    };
};

exports.getUserInfo = async (ctx, next) => {
    ctx.body = {
        username: "xiaozhu",
        phone: "15111111111",
    };
};


exports.preview = async (ctx, next) => {
    let str =
        '{"author":"xiaozhu","content":{"componentData":[{"animations":[],"events":{},"groupStyle":{},"isLock":false,"id":1,"component":"LImage","label":"贴纸","icon":"tupian","propValue":{"src":"/img/chongyang1.46045e03.png"},"style":{"width":154,"height":192,"borderRadius":0,"rotate":0,"opacity":1,"top":198,"left":14}},{"animations":[],"events":{},"groupStyle":{},"isLock":false,"component":"LText","label":"文字","icon":"tupian","propValue":{"text":"测试文字"},"style":{"rotate":0,"opacity":1,"top":127,"left":201,"width":100,"height":22,"fontSize":14,"fontWeight":500,"lineHeight":"","letterSpacing":0,"textAlign":"","color":"red"},"id":2}],"canvasStyleData":{"width":375,"height":667,"scale":100},"pageSetting":{"backgroundImage":"http://localhost:3000/upload/upload_8995642cac83cb6170a93a7904484876.JPG","backgroundSize":"contain","backgroundRepeat":"repeat","backgroundPosition":"center","phoneModel":"","title":"未命名作品","desc":"未命名作品"},"snapshotData":[[{"animations":[],"events":{},"groupStyle":{},"isLock":false,"id":1,"component":"LImage","label":"贴纸","icon":"tupian","propValue":{"src":"/img/chongyang1.46045e03.png"},"style":{"width":154,"height":192,"borderRadius":0,"rotate":0,"opacity":1,"top":0,"left":0}}],[{"animations":[],"events":{},"groupStyle":{},"isLock":false,"id":1,"component":"LImage","label":"贴纸","icon":"tupian","propValue":{"src":"/img/chongyang1.46045e03.png"},"style":{"width":154,"height":192,"borderRadius":0,"rotate":0,"opacity":1,"top":0,"left":0}},{"animations":[],"events":{},"groupStyle":{},"isLock":false,"component":"LText","label":"文字","icon":"tupian","propValue":{"text":"请输入"},"style":{"rotate":0,"opacity":1,"top":319,"left":182,"width":100,"height":22,"fontSize":14,"fontWeight":500,"lineHeight":"","letterSpacing":0,"textAlign":"","color":"red"},"id":2}],[{"animations":[],"events":{},"groupStyle":{},"isLock":false,"id":1,"component":"LImage","label":"贴纸","icon":"tupian","propValue":{"src":"/img/chongyang1.46045e03.png"},"style":{"width":154,"height":192,"borderRadius":0,"rotate":0,"opacity":1,"top":0,"left":0}},{"animations":[],"events":{},"groupStyle":{},"isLock":false,"component":"LText","label":"文字","icon":"tupian","propValue":{"text":"请输入"},"style":{"rotate":0,"opacity":1,"top":319,"left":127,"width":100,"height":22,"fontSize":14,"fontWeight":500,"lineHeight":"","letterSpacing":0,"textAlign":"","color":"red"},"id":2}],[{"animations":[],"events":{},"groupStyle":{},"isLock":false,"id":1,"component":"LImage","label":"贴纸","icon":"tupian","propValue":{"src":"/img/chongyang1.46045e03.png"},"style":{"width":154,"height":192,"borderRadius":0,"rotate":0,"opacity":1,"top":0,"left":0}},{"animations":[],"events":{},"groupStyle":{},"isLock":false,"component":"LText","label":"文字","icon":"tupian","propValue":{"text":"测试文字"},"style":{"rotate":0,"opacity":1,"top":127,"left":201,"width":100,"height":22,"fontSize":14,"fontWeight":500,"lineHeight":"","letterSpacing":0,"textAlign":"","color":"red"},"id":2}],[{"animations":[],"events":{},"groupStyle":{},"isLock":false,"id":1,"component":"LImage","label":"贴纸","icon":"tupian","propValue":{"src":"/img/chongyang1.46045e03.png"},"style":{"width":154,"height":192,"borderRadius":0,"rotate":0,"opacity":1,"top":198,"left":14}},{"animations":[],"events":{},"groupStyle":{},"isLock":false,"component":"LText","label":"文字","icon":"tupian","propValue":{"text":"测试文字"},"style":{"rotate":0,"opacity":1,"top":127,"left":201,"width":100,"height":22,"fontSize":14,"fontWeight":500,"lineHeight":"","letterSpacing":0,"textAlign":"","color":"red"},"id":2}]],"snapshotIndex":4},"saveAt":1634617216742}';

    let _pageData = JSON.parse(str);
    // 创建渲染器
    const renderer = require("vue-server-renderer").createRenderer();
    const sguoyi = require('../../server/public/engine_libs/sguoyi.umd').default
    Vue.use(sguoyi)
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
                    'fontSize',
                    'width',
                    'height',
                    'top',
                    'left',
                    'borderWidth',
                    'letterSpacing',
                    'borderRadius',
                ]
        
                const result = {}
                Object.keys(style).forEach(key => {
                    if (!filter.includes(key)) {
                        if (key != 'rotate') {
                            result[key] = style[key]
        
                            if (needUnit.includes(key)) {
                                result[key] += 'px'
                            }
                        } else {
                            result.transform = key + '(' + style[key] + 'deg)'
                        }
                    }
                })
        
                return result
            }
        },
        template: `<div id="app">
                    <section>
                        <div
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
          </html>
        `;
    } catch (e) {
        ctx.status = 500;
        ctx.body = "服务器错误";
    }
};

exports.authentication = async (ctx, next) => {
    console.log(ctx.state.user);
    ctx.body = {
        token: jwt.sign({ username: "xiaozhu" }, "shared", {
            expiresIn: "1d",
        }),
    };
};
