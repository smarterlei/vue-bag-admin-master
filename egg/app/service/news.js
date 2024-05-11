const Service = require('egg').Service

 

class NewsService extends Service {

    async getNewsList(){
            // 抓取接口数据
          var resp=  await  this.ctx.curl('http://www.phonegap100.com/appapi.php?a=getPortalList&catid=10&page=1')
        

          var  data = JSON.parse(resp.data)
        //   console.log(data,'data buffer')
          return data.result;

    }
}


module.exports = NewsService