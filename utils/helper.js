const path = require("path");

exports.isImage = path => {
    let ext = path.extname(path).toLowerCase();
    return [".png", ".jpg", ".jpeg"].indexOf(ext) > -1;
};
