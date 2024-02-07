const dayjs = require("dayjs");
module.exports = (app) => {
    const { STRING, INTEGER, BOOLEAN, DATE, TEXT } = app.Sequelize;
    return app.model.define(
        "Funds",
        {
            id: {
                type: INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            symbol: {
                type: STRING,
                comment: "指数名称",
            },
            current: {
                type: INTEGER,
                comment: "当前值",
            },
            precent: {
                type: INTEGER,
                comment: "涨跌幅",
            },
            high: {
                type: INTEGER,
                comment: "最高值",
            },
            low: {
                type: INTEGER,
                comment: "最低值",
            },
            amount: {
                type: INTEGER,
                comment: "成交金额",
            },
            createTime: {
                type: DATE,
                comment: "创建时间",
                get() {
                    return dayjs(this.getDataValue("createTime")).format(
                        "YYYY-MM-DD HH:mm:ss"
                    );
                },
            },
            updateTime: {
                type: DATE,
                comment: "更新时间",
                get() {
                    return dayjs(this.getDataValue("updateTime")).format(
                        "YYYY/MM/DD HH:mm:ss"
                    );
                },
            },
        },
        {
            createdAt: "createTime", // 指定名字
            updatedAt: "updateTime",
            tableName: "yxs_web_funds", // 定义实际表名 栏目表
        }
    );
};
