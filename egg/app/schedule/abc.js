module.exports={
    schedule:{
        // interval:2000,
        type:'all',
        cron: '0 0 */3 * * *', // 每3小时执行一次
        disable:false
    },
    async task(ctx){
        console.log('定时任务66666')
    }
}