const Service = require('egg').Service
const axios = require('axios')
const moment = require("moment");
class UserService extends Service {
    async getUserinfo() {
        const {ctx} = this
        const token = ctx.cookies.get('token', {signed: false, encrypt: true})
        if (token) {
            return await ctx.model.Member.findOne({
                where: {password: token},
                attributes: {exclude: ['password']},
            })
        } else {
            return false;
        }
    }

    async superadmin() {
        const userinfo = await this.getUserinfo();
        return {
            userinfo: userinfo,
            isSuperadmin: userinfo.id === 1
        }
    }

    async ipInfo() {
        const {ctx} = this;
        const ip = '117.147.17.218';
        const url = `https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=${ip}&co=&resource_id=6006&t=${+new Date()}&ie=utf8&oe=utf8&format=json&tn=baidu`
        try {
            const result = await ctx.curl(url, {
                method: 'get', // 设置请求方式 默认是GET
                dataType: 'json',
            });
            return {
                data: result.data.data[0]
            }
        } catch (e) {
            return {
                data: {},
                error: '获取失败'
            }
        }
    }

    async fundsInfo() {
        const { ctx } = this;
        const {fundDate, ...params} = ctx.request.body
        console.log(fundDate)
        // 沪深每日100强
        let url = "https://xueqiu.com/service/v5/stock/screener/quote/list?page=1&size=20&order=desc&order_by=percent&exchange=CN&market=CN&type=sha&_=1659672349641"

        const res = await ctx.curl(url, { dataType: "json", method: "GET" });

        let result = res.data.data.list.splice(0, 20).map((item) => {
            return {
                name: item.name,
                symbol: item.symbol,
                current: item.current,
                chg: item.chg >= 0 ? "+" + item.chg : item.chg,
                amount: item.amount,
                percent: item.percent,
                pb: item.pb,
                peTtm: item.pe_ttm,
                fundDate:fundDate
                // 涨跌幅

            };
        });
        // 给数据库插入多条数据
        // let outerData = [];
        // result.forEach((item) => {
        //     let data = [];
        //     for (const key in item) {
        //         data.push(item[key]);
        //     }

        //     outerData.push(data);
        // });
        console.log(" 写入数据库的原始数据 写入原始数据", result[0]);
 
        const resultlist = await ctx.model.Web.Chfunds.findAll({
            where: { fundDate },
          
        })
        console.log('redate-list',resultlist.length)
        
        
       
        try {
            if(resultlist.length>0){
                return {
                    data: {},
                    error: '当前日期已经存在数据'
                } 
            }
            else{
                await ctx.model.Web.Chfunds.bulkCreate(result) // 批量添加多条数据
                return { data: result }

            }

        }
        catch (e) {
            return {
                data: {},
                error: '获取失败'
            }
        }
    }

    ///新增
    async addRows(list) {
        // list 结构 [[id,title,href],[id,title,href]]
        const result = await this.app.mysql.query(
            "INSERT INTO ch_fund (name,symbol,current,chg,amount,precent,datetime) values ?",
            [list]
        );
        return result;
    }


}




module.exports = UserService
