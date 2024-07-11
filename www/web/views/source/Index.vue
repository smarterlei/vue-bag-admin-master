<template>
    <div class="source">
        <div class="container">
            <el-row v-show="false">
                <div class="downloads">
                    <el-row :gutter="10">

                        <el-col v-for="(item, index) in downloads.items" :key="index" :span="6" :xs="24" :sm="8">
                            <el-card style="margin-bottom: 10px;">
                                <h3> {{ item.title }}</h3>
                                <el-image :src="'/api' + item.image" width="300"> </el-image>
                                <el-link type="primary">{{ item.content.slice(0, 18) }}…</el-link>
                            </el-card>
                        </el-col>
                    </el-row>

                </div>


            </el-row>
            <el-row>

                <el-form :model="queryParams" ref="formRef" :inline="true">
                <el-form-item><el-button :icon="Refresh" @click="getGrab" plain type="primary" class="ml20"> 抓取当日数据</el-button></el-form-item>

                    <el-form-item label=" 龙虎榜TOP20"></el-form-item>
                    <el-form-item label="名称" prop="name">
                        <el-input   v-model="queryParams.name"> </el-input>
                    </el-form-item>
                    <el-form-item label="日期">
                        <el-date-picker type="date" v-model="queryParams.updateTime"
                            value-format="YYYY-MM-DD"></el-date-picker>
                    </el-form-item>
                </el-form>

                <el-button @click="handleQuery" type="primary" class="ml20"> 查询</el-button>
                <el-button @click="resetQuery(formRef)" type="primary" plain class="ml20"> 重置</el-button>

                <el-table :data="datas" size="small" highlight-current-row border>
                    <el-table-column label="名称" prop="name"></el-table-column>
                    <el-table-column label="股票代码" prop="symbol"></el-table-column>
                    <el-table-column label="股价" prop="current"></el-table-column>
                    <el-table-column label="涨跌值" prop="chg"></el-table-column>
                    <el-table-column label="成交金额" prop="amount"></el-table-column>
                    <el-table-column label="涨跌幅度" prop="percent"></el-table-column>
                    <el-table-column label="市净率" prop="pb"></el-table-column>
                    <el-table-column label="日期" prop="updateTime"></el-table-column>


                </el-table>
                <el-pagination v-model:current-page="queryParams.currentPage" v-model:page-size="queryParams.pageSize"
                    :total="total" small :page-sizes="[10, 20]" @current-change="getList" @size-change="getList"
                    layout="total, sizes, prev, pager, next" background>
                </el-pagination>
            </el-row>
        </div>
    </div>
</template>
<script lang="ts" setup name="source">
import axios from 'axios'
import { ref, reactive, getCurrentInstance, ComponentInternalInstance } from "vue"
import moment from 'moment'
import { webDownloadAll, webBannerAll, webFunds } from '@/bag-web/service/app';
import {ElNotification} from "element-plus";
import { Message,Search,Star,Refresh} from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus';
const formRef = ref<FormInstance>()
const downloads = reactive({
    items: [],
})
const datas = ref([])
const queryParams = ref({
    name:'',
    updateTime: '2024-05-08',
    currentPage: 1,
    pageSize: 10
})
queryParams.value.updateTime = moment().format('yyyy-MM-DD')
const total = ref(0)
const getList = () => {
    axios.post('api/web/funds/top20', queryParams.value).then((res: any) => {
        console.log(res, '==========')
        datas.value = res.data.data.rows
        total.value = res.data.data.total
    })
}
getList()
function handleQuery() {
  queryParams.value.currentPage = 1;
  getList();
}
/** 重置按钮操作 */
 const resetQuery=(formEl:FormInstance | undefined)=> {
  if(!formEl) return
  formEl.resetFields()
  
  handleQuery();
}
const getGrab =()=>{
    axios.post('api/web/funds/all',{fundDate:moment().format('yyyy-MM-DD')}).then((res: any) => {
        if(res.data.code=='1001'){
            ElNotification({
                    title: '异常',
                    message: `${res.data.message}`,
                    type: 'warning',
                })
        }
        else{
            ElNotification({
                    title: '数据抓取成功',
                    message: `数据抓取成功`,
                    type: 'success',
                })
        }
       
    })
}
webDownloadAll().then((res: any) => {
    downloads.items = res
})


</script>
<style lang="less" scoped>
.source {
    &-left {}

    .downloads {}
}

.ml20 {
    margin-left: 20px;
}
</style>
