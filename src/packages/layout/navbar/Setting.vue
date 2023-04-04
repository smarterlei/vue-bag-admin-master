<template>
    <a-drawer
        title="设置主题"
        :placement="placement"
        :closable="false"
        :width="width"
        :visible="visible"
        @close="onClose"
    >
        <a-form :model="formState" labelAlign="right" :label-col="{span:10}" :wrapper-col="{span:14}">
            <a-form-item labelAlign="left" label="是否悬浮左侧菜单">
                <a-switch @change="(check)=>{changeStyle(check,'floatingMenu')}"
                          v-model:checked="formState.floatingMenu"
                />
            </a-form-item>
            <a-form-item labelAlign="left" label="是否折叠项目菜单">
                <a-switch @change="(check)=>{changeStyle(check,'foldPrjMenu')}"
                          v-model:checked="formState.foldPrjMenu"
                />
            </a-form-item>
            <a-form-item labelAlign="left" label="页签显示风格">
                <a-select @change="(value)=>{changeStyle(value,'tabStyle')}" v-model:value="formState.tabStyle"
                          placeholder="选择页签显示风格">
                    <a-select-option v-for="item in tabStyles" :key="item.value">{{ item.name }}</a-select-option>
                </a-select>
            </a-form-item>
 
            <!-- <a-button @click="changeTheme">123</a-button> -->
        </a-form>
                <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">主题色</h3>

          <div style="height: 20px">
            <a-tooltip class="setting-drawer-theme-color-colorBlock" v-for="(item, index) in themeList" :key="index">
              <template #title>
                {{ item.key }}
              </template>
              <a-tag :color="item.color" @click="changeColor(item.color)">
                 <!-- <a-icon type="check" v-if="item.color === primaryColor"></a-icon> -->
              </a-tag>
            </a-tooltip>

          </div>
        </div>
        <div
            :style="{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e8e8e8',
                padding: '10px 16px',
                textAlign: 'right',
                left: 0,
                background: '#fff',
                borderRadius: '0 0 4px 4px',
          }"
        >
            <a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
            <a-button type="primary" @click="onClose">保存设置</a-button>
        </div>
    </a-drawer>
</template>
<script lang="ts"  setup>
import {computed, defineComponent, reactive, ref} from 'vue';
import {themeList, tabStyles} from '@/packages/theme/utils'
import {find} from "@/packages/utils/lodash";
// @ts-ignore
import darkVars from '@/config/dark.json';
import appPinia from '@/packages/pinia/app'
// import configCss fr
// export default defineComponent({
//     setup() {
        const appStore = appPinia()
        const formState =reactive({
            floatingMenu:true,
            foldPrjMenu:false,
            colorOptions:[{name:'primary-color',value:1}]
        })
        const primaryColor ='#1890FF'
        const placement = ref('right');
        const visible = ref(false);
        const showDrawer = () => {
            visible.value = true;
        };

        const onClose = () => {
            visible.value = false;
        };

         const cacheTheme = {};
        let data = find({key: 'path', value: cacheTheme}, themeList)
        console.log('theme list -data',themeList)

        // const changeTheme = (path: string) => {
        //     window['less'].modifyVars({
        //         '@primary-color': '#ff5500'
        //     }) 
        // }
          const  changeColor= (color)=> {
            console.log('change-color',color)
    }
 
        const changeStyle = (value: boolean | string | number, key: string) => {
        }

        const width = 400
        defineExpose({ showDrawer }); // 向外部组件暴露部分方法

//         return {
//             placement,
//             formState,
//             visible,
//             // showDrawer,
//             onClose,
//             themeList,
//             tabStyles,
//             changeTheme,
//             width,
//             changeStyle
//         };
//     },
// });
</script>
<style lang="less" scoped>
        .setting-drawer-theme-color-colorBlock {
      width: 20px;
      height: 20px;
      border-radius: 2px;
      float: left;
      cursor: pointer;
      margin-right: 8px;
      padding-left: 0px;
      padding-right: 0px;
      text-align: center;
      color: #fff;
      font-weight: 700;

      i {
        font-size: 14px;
      }
    }
  
</style>
