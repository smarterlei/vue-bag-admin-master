'use strict';

const baseController = require('./baseController');

class HomeController extends baseController {
    async index() {
        const {ctx} = this;
        const list = await ctx.service.news.getNewsList()
        // ctx.body = 'hi, i am 王先生';
      await  ctx.render('index',{
        list:list
      })
     
      
    }

    async library() {
        let result = `<div class="async">这个是测试http网络异步的组件,${+new Date()}</div>`
        this.result({data: result})
    }

}

module.exports = HomeController;
