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

        const res = await axios.get(url, {
            withCredentials: true,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
                "Content-Type": "application/json; charset=utf-8",
                Cookie: "cookiesu=211714960715562; device_id=2fb164dff5f7567f7abefc6f1562ad95; smidV2=20240506095840f26673b034fdbe8b474228aabc9a95770046457e690452640; s=ak1vvoo9qp; bid=2f7bc5ae1d6d9113a73ae0d7b3c35b34_lwjzgyah; Hm_lvt_1db88642e346389874251b5a1eded6e3=1719361682,1720158094,1720420915,1720596938; __utma=1.301921251.1716512684.1716512684.1720596946.2; __utmz=1.1720596946.2.2.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; xq_a_token=0f4148207a387024e40c4ad1164e5b1f49924015; xqat=0f4148207a387024e40c4ad1164e5b1f49924015; xq_r_token=4f46482cb280cc554a8b5f345a0308bd43576be0; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOjI1OTk0NzEwNjMsImlzcyI6InVjIiwiZXhwIjoxNzIzMTg4OTU4LCJjdG0iOjE3MjA1OTY5NTgzNjEsImNpZCI6ImQ5ZDBuNEFadXAifQ.O9csh96pIpt3VwU61J_y1AGrA6J_8vgL4lR3mutaEXu69TAZnXCSsO5Daqs6ACyTU8dDrMP0WxYVSoYixUA0Ra7ockaV1JH4MjuMtVXbti1DvCXqP7KzCMyo9A4Tb2CnE5K2DX_UxZDmtwrkBLqjdihnfSEaLcrQb9H4FFPKqJBLrQHUmDXPa9eqD7EtbUiFGbn5CyDQ3rqeE8gKXCo9GHO87AdXTEx8jelQzzV22jKptf7xq02u7jZoTABwEsfgv0OylsfXT32-CwYHENfYHhkKb8eWFi6aa6q3-OI9tzcWAeDuMuzg8-NTF24d6ljlzJ0iKdqkEYGFcnoUxIUpyw; xq_is_login=1; u=2599471063; .thumbcache_f24b8bbe5a5934237bbc0eda20c1b6e7=xSz4h+Xhq8WVDpQ6V+puAEgxGsTU2pnTW3SmScXPPzgfwFvbBlk4vGc2lnlP933MiDTppT6FMDUD0OvV03AOYg%3D%3D; acw_tc=2760827217206879776695305e7144d712985967a7ff3436bbf0c75bc6ee33",
            },
        }); //ctx.curl(url, { dataType: "json", method: "GET" });
       
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
