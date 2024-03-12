'use strict'

const baseController = require('../baseController')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const moment = require('moment')
class WebFundsController extends baseController {


    /**
     * 添加数据
     * @returns {Promise<void>}
     */
    async create() {
        // const { ctx } = this
        // const result = await ctx.model.Web.Leave.create({ ...ctx.request.body })
        // this.result({ data: result })
    }



    /**
     * 获取所有 关于指数基金的数据
     * @returns {Promise<void>}
     */
    async all() {
        const { data, error } = await this.ctx.service.user.fundsInfo()
        // console.log(data, 'funds')
        if (error) {
            this.result({ data: '', message: error, code: 1001 })
        } else {

            this.result({ data: data })
        }

    }


    async top20() {
        const { ctx } = this
        const { currentPage = 1, pageSize = 10, ...params } = ctx.request.body
        const where = {}
        const sqlFragment = `DATE(updateTime) = "${ctx.request.body.updateTime}"`
        for (const whereKey in params) {
            console.log('where-key', params[whereKey], whereKey)
            if (params[whereKey]) {
                whereKey === 'updateTime' ? where[whereKey] = Sequelize.literal(sqlFragment) : where[whereKey] = { [Op.like]: `%${params[whereKey]}%` }
                // 模糊查詢 https://www.sequelize.com.cn/core-concepts/model-querying-basics
            }
        }
        const result = await ctx.model.Web.Chfunds.findAll({
                where: { ...where },
                limit: parseInt(pageSize),
                offset: (currentPage - 1) * pageSize,
            })
        const total = await ctx.model.Web.Chfunds.count({ where: where })
        this.result({ data: { rows: result, total, pageSize, currentPage } })
    }




}

module.exports = WebFundsController
