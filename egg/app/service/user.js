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
                Cookie: "cookiesu=211714960715562; device_id=2fb164dff5f7567f7abefc6f1562ad95; smidV2=20240506095840f26673b034fdbe8b474228aabc9a95770046457e690452640; s=ak1vvoo9qp; bid=2f7bc5ae1d6d9113a73ae0d7b3c35b34_lwjzgyah; xq_is_login=1; u=2599471063; __utma=1.301921251.1716512684.1720596946.1721613266.3; __utmz=1.1721613266.3.3.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; xq_a_token=8adac5e83cf45bdac474f551268efa88cd2090a0; xqat=8adac5e83cf45bdac474f551268efa88cd2090a0; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOjI1OTk0NzEwNjMsImlzcyI6InVjIiwiZXhwIjoxNzI0NTQ3MTg1LCJjdG0iOjE3MjE5NTUxODU5NDYsImNpZCI6ImQ5ZDBuNEFadXAifQ.I3KnHqjCif5KIYTZUwRaufW8gVlfbcp-fi4q1uv0wjyrb189Jch4edjOIp_qCUKhDZBXUIuUZ9-bxlKou22amLKe99UN44O9t8BYpMQ6ikr5PErUJ-FwkhWIIjxCf2adeflrHgPSX6vZ-TwaXR0iRY8pllR2u_UQk7CK3j1TNhIdA8rx-Jq15LbTqs7gbx7AO_g46bV7d-wPnBOEPfIBfuRm3jBhwa04XMs3ybM-7vwHLj1bhqYmcVFmhCGGEyRuq88MibZ1eVYILix7artieTFR5zGBU1E5IZzBUXUKJMXgOe1LPJSJUBuBfBPO7q8xWvt9fJhy2OREdri-IWDMLA; xq_r_token=66ded22b418cb7526991f9ba7387069f1a5b0b62; Hm_lvt_1db88642e346389874251b5a1eded6e3=1721613266,1721955187,1722385195,1722566443; .thumbcache_f24b8bbe5a5934237bbc0eda20c1b6e7=XPEbQpZOb4KDu2RrTO3D1klatghmzJwIvvMjY4FoNy1GTdwto5nTGNVZwWp9kTcT09koQpdJfZm+PoevzhSV9w%3D%3D; ssxmod_itna=Qq02AKiKYvqjxDq0Le0P7=ox2DUoplBDiqgFEmTH55Dsk5bDSxGKidDqxBmmZY2mei4xg0hF5GQGu4hXGDlaTY68QAPc=TEYx0aDbqGkqnQb4GGnxBYDQxAYDGDDPDoPKD1D3qDkD7xU1S6vCDYPDED5DaxDbDieCfxGCDeKD0ruHDQKDuxvqqD2CiDDzi7fbU60KY9BHrIHIy=iwkjxCD7yIDlcxSK8pM9deVcBjc87dfx0k3q0OMp5GhpOPuPYsKb2Y6mGOxrGe562Dki04wAeoWmi5qlwFGN+5qASv5jD5hvNeDDcKijxte0=YD==; ssxmod_itna2=Qq02AKiKYvqjxDq0Le0P7=ox2DUoplBDiqgFEmTH5ikjfotDl=tzDjbyK21Rg2GxRGCkiNY1mxAp=yYUO0hhyWIB9APTOz1KrpK5Q8Ouv2I6p702y8STAyI5FWbFu6xymAUuk5WYuAvYBD290xfj8GmDh6ep8hI3AAmG8mC+j008ev8mohvGDQh8dY9tD+EjSnc8+D2f+X5FRfIlYo7oSG=FMENB=vj06XrUcUevx3f0r6ejWEqO9LP3fiXe6tCW8O2/m3A5p56dbArj+EYoXqfRw88WvELsG3caMwc6Q3OW715E2YpI9DnqwzFrnunGp8CK73es92OIF+iPTzbMeyT/Tx2yUfbT4BL92aKy7BmP=WsQEabwzUBYa+pz41eFxF4tbwie9489jBw+FRhYRYBBKjucG5+CEI/+PyHxaqD6TD2oWGu5HR4lb4AyWNx+05xfo4M9Tk8R0Rj/5rdRiuI85xtV5vIAgKrADItKuhf4/UcDndhjAqbMKjfbCcSCDSF++lF+7gKR3NzfulrMbklFycndh5goLb+B9Y45tthqYGqb0WMhxHjYpoO7uDIkrKKLSrQj11v=6CPNwTsE17/cqmRbkb1cb6G0Y7xDKT5eYdfPRRkqv47cgogO8vYteHSc8MjECyAxOXN1uqB7xtBDrXt2oZ1Gni7Hi/3i031iAHhD1YV05/EslyM1scppQsduD7s5yRpq/2qzzg2D01eIS7dRFDthaB4AtV5DjKDYKeYDD===; acw_tc=2760827b17228452309737231eb664cf57d53aefdd150537225b6f1b59cd4f",
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
