module.exports = app => {
    const { router, controller } = app
    router.all('/web/funds/all', controller.web.funds.all) // 爬取龙虎榜前20 并写入mysql数据库
    router.all('/web/funds/create', controller.web.funds.create) // 已禁用
    router.all('/web/funds/top20', controller.web.funds.top20)

}
