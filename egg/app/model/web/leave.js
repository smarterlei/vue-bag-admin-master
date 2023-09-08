const dayjs = require("dayjs");
module.exports = (app) => {
    const { STRING, INTEGER, BOOLEAN, DATE, TEXT } = app.Sequelize;
    return app.model.define(
        "Leave",
        {
            id: {
                type: INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: STRING,
                comment: "用户昵称",
            },
            userid: {
                type: INTEGER,
                comment: "用户id",
            },
            userhead: {
                type: STRING,
                comment: "用户头像",
            },
            articleId: {
                type: INTEGER,
                comment: "留言文章ID",
            },
            email: {
                type: STRING,
                comment: "邮箱",
            },
            address: {
                type: STRING,
                comment: "地址",
            },
            content: {
                type: STRING(512),
                comment: "留言记录",
            },
            shows: {
                type: BOOLEAN,
                defaultValue: false,
                comment: "是否显示",
            },
            likes: {
                type: INTEGER,
                comment: "点赞数",
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
            tableName: "yxs_web_leave", // 定义实际表名 栏目表
        }
    );
};
