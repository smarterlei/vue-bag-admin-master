<template>
    <a-modal v-bind="curdTable.$cModalAttrs" @ok="curdTable.$cModalAttrs.ok(formRef)"
        @cancel="curdTable.$cModalAttrs.cancel">
        <a-form ref="formRef" :model="curdTable.create.formState" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
            <a-row>
                <a-col v-for="item in curdTable.create.formItem" :key="item._key" v-bind="item.$colAttrs">
                    <a-form-item v-bind="item.$formItemAttrs">
                        <component v-if="curdTable.utils.compatibleCompValue(item.el) === '1'" :is="item.el"
                            v-model:value="curdTable.create.formState[item.$formItemAttrs.name]"
                            v-bind="curdTable.utils.filter$elAttrs(item.$elAttrs).$attrs"></component>
                        <component v-if="curdTable.utils.compatibleCompValue(item.el) === '2'" :is="item.el"
                            v-model:checked="curdTable.create.formState[item.$formItemAttrs.name]"
                            v-bind="curdTable.utils.filter$elAttrs(item.$elAttrs).$attrs"></component>
                        <component v-if="curdTable.utils.compatibleCompValue(item.el) === '3'" :is="item.el"
                            v-model:file-list="curdTable.create.formState[item.$formItemAttrs.name]"
                            v-bind="curdTable.utils.filter$elAttrs(item.$elAttrs).$attrs"></component>
                        <template v-if="item.el === 'bag-upload-image'">
                            <a-form-item-rest>
                                <a-input v-model:value="curdTable.create.formState[item.$formItemAttrs.name]"
                                    v-bind="curdTable.utils.filter$elAttrs(item.$elAttrs).$attrs" />
                            </a-form-item-rest>
                            <bag-upload-image v-bind="item.$slotAttrs"
                                v-model:image="curdTable.create.formState[item.$formItemAttrs.name]"></bag-upload-image>
                        </template>
                        <template v-if="item.el === 'md-editor'">
                            <md-editor v-model="curdTable.create.formState[item.$formItemAttrs.name]"
                                v-bind="curdTable.utils.filter$elAttrs(item.$elAttrs).$attrs" />
                        </template>
                        <template v-if="item.slot.name">
                            <slot :name="item.slot.name" v-bind="{ formState: curdTable.create.formState, item }"></slot>
                        </template>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>
<script lang="ts">
import axios from 'axios'
import { defineComponent, reactive, ref } from 'vue'
import { useSlots, useAttrs } from 'vue'

export default defineComponent({
    props: {
        curdTable: {
            type: Object,
            default: () => {
            },
        },
    },
    setup() {
        const formRef = ref(null)

        // 图片上传事件 
        const onUploadImg = async (files, callback) => {
            console.log("in", files)
            const res = await Promise.all(
                files.map((file) => {
                    return new Promise((rev, rej) => {
                        // 传给后端一个FormData数据，添加键值对，这里我添加了这个文章的ID和file
                        const form = new FormData();
                        form.append('file', file);
                        // form.append("articleId", 5)
                        axios
                            // 这里是我的后端接口，请求地址和路径可以自己改
                            .post('api/upload/uploadImg', form, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                            .then((res) => {
                                console.log(res)
                                rev(res)
                            })
                            .catch((error) => rej(error));
                    });
                })
            );

            callback(res.map((item) => item.data.url));
        }
        return {
            formRef,
            onUploadImg
        }
    },
})
</script>
