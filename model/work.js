const mongoose = require("mongoose");
const { Schema, model } = mongoose;
module.exports = model(
    "Work",
    new Schema({
        author: { type: String, required: true },
        content: {
            componentData: { type: Array },
            canvasStyleData: {
                width: { type: Number, default: 375 },
                height: { type: Number, default: 667 },
                scale: { type: Number, default: 100 },
            },
            pageSetting: {
                backgroundImage: { type: String, default: "" },
                backgroundPosition: { type: String, default: "center" },
                backgroundRepeat: { type: String, default: "repeat" },
                backgroundSize: { type: String, default: "contain" },
                desc: { type: String, default: "未命名作品" },
                phoneModel: { type: String, default: "" },
                title: { type: String, default: "未命名作品" },
            },
            snapshotData: { type: Array },
            snapshotIndex: { type: Number, default: 0 },
        },
        coverImg: { type: String, default: "" },
    }),
    "work"
);
