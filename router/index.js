const fs = require("fs");

module.exports = app => {
    fs.readdir(__dirname, function(err, res) {
        res.forEach(file => {
            if (file !== "index.js") {
                const router = require(`./${file}`)
                app.use(router.routes(), router.allowedMethods());
            }
        });
    });
};
