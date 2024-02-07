module.exports = app => {
    const { router, controller } = app
    router.all('/web/funds/all', controller.web.funds.all)
    router.all('/web/funds/create', controller.web.funds.create)

}
