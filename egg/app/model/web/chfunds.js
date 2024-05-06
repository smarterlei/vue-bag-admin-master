const dayjs = require("dayjs");
const moment = require("moment");
module.exports = (app) => {
    const { STRING, INTEGER, BOOLEAN, DATE, TEXT, DECIMAL } = app.Sequelize;
    return app.model.define(
        "Chfunds",
        {
            id: {
                type: INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: STRING,
                comment: "名称",
            },
            symbol: {
                type: STRING,
                comment: "股票代码",
            },
            current: {
                type: STRING,
                comment: "股价",
            },
            chg: {
                type: STRING,
                comment: "涨跌值",
            },
            amount: {
                type: INTEGER,
                comment: "成交金额",
            },
            percent: {
                type: DECIMAL,
                comment: "涨跌幅度",
            },
            pb: {
                type: STRING,
                comment: "市净率",
            },

            peTtm: {
                type: STRING,
                comment: "动态市盈率",
            },
            fundDate:{
                type: STRING,
                comment: "基金日期",
            },
            createTime: {
                type: DATE,
                comment: "创建时间",
                get() {
                    return moment(this.getDataValue("createTime")).format(
                        "YYYY-MM-DD HH:mm:ss"
                    );
                },
            },
            updateTime: {
                type: DATE,
                comment: "更新时间",
                get() {
                    return moment(this.getDataValue("updateTime")).format(
                        "YYYY-MM-DD HH:mm:ss"
                    );
                },
            },
           
        },
        {
            createdAt: "createTime", // 指定名字
            updatedAt: "updateTime",
            tableName: "ch_funds", // 定义实际表名 栏目表
        }
    );
};
