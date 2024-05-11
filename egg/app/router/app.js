module.exports = app => {
    const {router, controller} = app;
    router.all('/app/library',controller.home.library)
    router.all('/app/news',controller.news.index)
};
