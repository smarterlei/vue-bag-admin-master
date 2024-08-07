'use strict'

const baseController = require('../baseController')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const ExcelJS = require("exceljs");
const path = require("path");

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

    async export() {
        // 导出 excel
        try {
            const { ctx } = this;
            const { ks } = ctx.request.body;
            const param = ctx.request.body || {};
            console.log("-----------导出", param);

            const result = await ctx.model.Web.Leave.findAll();

            // 创建一个新的工作簿
            const workbook = new ExcelJS.Workbook();
            // 添加一个工作表
            const worksheet = workbook.addWorksheet("LeaveBook", {
                properties: { tabColor: { argb: "FF00FF00" } },
            });

            // 添加表头
            worksheet.columns = [
                { header: "ID", key: "id", width: 10 },
                { header: "Name", key: "username", width: 10 },
                { header: "Email", key: "email", width: 10 },
                { header: "address", key: "address", width: 10 },
                { header: "content", key: "content", width: 60 },
                { header: "shows", key: "shows", width: 10 },
                { header: "createTime", key: "createTime", width: 10 },
                { header: "updateTime", key: "updateTime", width: 10 },
                { header: "articleId", key: "articleId", width: 10 },
                { header: "userId", key: "userId", width: 10 },
                { header: "userhead", key: "userhead", width: 10 },
                { header: "likes", key: "likes", width: 10 },
            ];

            // 添加行数据
            result.forEach((user) => {
                worksheet.addRow(user);
            });
            const filePath = path.join(
                this.config.baseDir,
                "app/public/leavebook.xlsx"
            );
            // 写入文件
            await workbook.xlsx.writeFile(filePath);
            this.result({ data: `Excel file has been created at ${filePath}` });
        } catch (error) {
            this.result({ data: `${error}` });
        }
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
