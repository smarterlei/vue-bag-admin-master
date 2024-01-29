module.exports = (app) => {
    const { router, controller, io } = app;
    // io.of("/").route("/send", io.controller.index.send);
    // io.of("/").route("/ping", io.controller.index.ping);
    io.of("/").route("sendMsg", io.controller.index.sendMsg);
};
