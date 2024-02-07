'use strict'

const baseController = require('../baseController')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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


}

module.exports = WebFundsController
