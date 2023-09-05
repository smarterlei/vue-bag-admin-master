const Controller = require("egg").Controller;
module.exports = class baseController extends Controller {
    result({ code = 1, data = "", message = "success", status = 200 }) {
        const { ctx } = this;
        if (code !== 1) {
            message = message === "success" ? "error" : message;
        }
        ctx.response.status = status;
        ctx.body = { code, data, message };
    }
};
