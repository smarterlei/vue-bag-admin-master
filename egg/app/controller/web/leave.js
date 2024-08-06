'use strict'

const baseController = require('../baseController')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class WebLeaveController extends baseController {
    /**
     * 添加数据
     * @returns {Promise<void>}
     */
    async create() {
        const { ctx } = this;
        const result = await ctx.model.Web.Leave.create({
            ...ctx.request.body,
        });
        this.result({ data: result });
    }

    /**
     * 删除数据
     * @returns {Promise<void>}
     */
    async delete() {
        const { ctx } = this;
        const { id } = ctx.request.body;
        const result = await ctx.model.Web.Leave.destroy({
            where: { id },
        });
        this.result({ data: result });
    }

    /**
     * 删除多个路由
     * @returns {Promise<void>}
     */
    async deletes() {
        const { ctx } = this;
        const { ids } = ctx.request.body;
        const result = await ctx.model.Web.Leave.destroy({
            where: {
                id: [...ids],
            },
        });
        this.result({ data: result });
    }

    /**
     * 查找
     * @returns {Promise<void>}
     */
    async find() {
        const { ctx } = this;
        const param = ctx.request.body;
        const result = await ctx.model.Web.Leave.findOne({
            where: param,
        });
        this.result({ data: result });
    }

    // 链表查询
    // Blog.associate = function() {
    //     app.model.Blog.belongsTo(app.model.Type, { foreignKey: 'type_id', targetKey: 'id'})
    // }

    // //service 查询方式也简化如下
    // async list() {
    //       let result = await this.ctx.model.Blog.findAll({
    //           include: [{ model: this.ctx.model.Type, attributes: ['type_name'] }]
    //       })
    //       return result
    // }

    async page() {
        const { ctx } = this;
        const { currentPage = 1, pageSize = 10, ...params } = ctx.request.body;
        const where = {};
        const sqlFragment = `DATE(updateTime) = "${ctx.request.body.updateTime}"`;
        for (const whereKey in params) {
            console.log("where-key", params[whereKey], whereKey);
            if (params[whereKey]) {
                whereKey === "updateTime"
                    ? (where[whereKey] = Sequelize.literal(sqlFragment))
                    : (where[whereKey] = {
                          [Op.like]: `%${params[whereKey]}%`,
                      });
                // 模糊查詢 https://www.sequelize.com.cn/core-concepts/model-querying-basics
            }
        }
        const result = await ctx.model.Web.Leave.findAll({
            where: { ...where },
            limit: parseInt(pageSize),
            offset: (currentPage - 1) * pageSize,
        });
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const detail = await ctx.model.Web.Article.findOne({
                where: { id: item.articleId },
            });
            item.setDataValue("detail", detail);
        }

        const total = await ctx.model.Web.Leave.count({ where: where });
        this.result({ data: { rows: result, total, pageSize, currentPage } });
    }

    /**
     * 获取所有数据，可以带条件查询
     * @returns {Promise<void>}
     */
    async all() {
        const { ctx } = this;
        const { ks } = ctx.request.body;
        const param = ctx.request.body || {};
        console.log("-----------", param);
        const where = {};
        for (const paramKey in param) {
            where[paramKey] = { [Op.like]: `%${param[paramKey]}%` }; // 模糊查找
        }
        const result = await ctx.model.Web.Leave.findAll({
            where: { ...where },
        });
        this.result({ data: result });
    }

    /**
     * 编辑数据
     * @returns {Promise<void>}
     */
    async update() {
        const { ctx } = this;
        const body = ctx.request.body;
        const result = await ctx.model.Web.Leave.update(
            {
                ...body,
            },
            {
                where: {
                    id: body.id,
                },
            }
        );
        this.result({ data: result });
    }
}

module.exports = WebLeaveController
