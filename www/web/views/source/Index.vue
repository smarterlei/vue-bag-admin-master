<template>
    <div class="source">
        <div class="container">
            <el-row >
                
                   <div class="downloads">
                       <el-row :gutter="10">
                        
                            <el-col v-for="item in downloads.items" :span="6" :xs="24" :sm="8">
                                <el-card style="margin-bottom: 10px;" >
                                       <h3> {{ item.title }}</h3>
                                        <el-image :src="'/api'+item.image" width="300"   > </el-image>
                                        <el-link type="primary">{{ item.content.slice(0,18) }}…</el-link>
                                </el-card>
                            </el-col>
                       </el-row>
                      
                   </div>
               
                <!-- <el-col :xs="24" :sm="24" :md="16" :lg="12" :xl="12">
                    <div class="source-center"></div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                    <div class="source-right"></div>
                </el-col> -->
            </el-row>
        </div>
    </div>
</template>
<script lang="ts" setup name="source">
import {ref,reactive} from "vue"
import {webDownloadAll, webBannerAll,webFunds} from '@/bag-web/service/app';
const downloads = reactive({
    items: [],
})
webDownloadAll().then(res=>{
    downloads.items= res
})
webFunds().then(res=>{
    console.log(res,'funds')
})
 
</script>
<style lang="less" scoped>
.source {
    &-left {

    }
    .downloads{  
       
    }
}
</style>
