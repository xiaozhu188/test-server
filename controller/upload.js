const path = require('path');

exports.index = async (ctx, next) => {
    const file = ctx.request.files.file
    const basename = path.basename(file.path)
    ctx.body = {
        url: `${ctx.origin}/upload/${basename}`
    }
};
