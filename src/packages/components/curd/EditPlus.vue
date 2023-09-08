<template>
    <a-modal v-bind="curdTable.$eModalAttrs" @ok="curdTable.$eModalAttrs.ok(formRef)"
        @cancel="curdTable.$eModalAttrs.cancel">
        <a-form ref="formRef" :model="curdTable.edit.formState" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
            <a-row>
                <a-col v-for="item in curdTable.edit.formItem" :key="item._key" v-bind="item.$colAttrs">
                    <a-form-item v-bind="item.$formItemAttrs">
                        <component v-if="curdTable.utils.compatibleCompValue(item.el) === '1'" :is="item.el"
                            v-model:value="curdTable.edit.formState[item.$formItemAttrs.name]"
                            v-bind="curdTable.utils.filter$elAttrs(item.$elAttrs).$attrs"></component>
                        <component v-if="curdTable.utils.compatibleCompValue(item.el) === '2'" :is="item.el"
                            v-model:checked="curdTable.edit.formState[item.$formItemAttrs.name]"
                            v-bind="curdTable.utils.filter$elAttrs(item.$elAttrs).$attrs"></component>
                        <component v-if="curdTable.utils.compatibleCompValue(item.el) === '3'" :is="item.el"
                            v-model:file-list="curdTable.edit.formState[item.$formItemAttrs.name]"
                            v-bind="curdTable.utils.filter$elAttrs(item.$elAttrs).$attrs"></component>
                        <template v-if="item.el === 'bag-upload-image'">
                            <a-form-item-rest>
                                <a-input v-model:value="curdTable.edit.formState[item.$formItemAttrs.name]"
                                    v-bind="curdTable.utils.filter$elAttrs(item.$elAttrs).$attrs" />
                            </a-form-item-rest>
                            <bag-upload-image v-bind="item.$slotAttrs"
                                v-model:image="curdTable.edit.formState[item.$formItemAttrs.name]"></bag-upload-image>
                        </template>
                        <template v-if="item.el === 'md-editor'">
                            <md-editor v-model="curdTable.edit.formState[item.$formItemAttrs.name]"
                                v-bind="curdTable.utils.filter$elAttrs(item.$elAttrs).$attrs" @onUploadImg="(files, callback) => onUploadImg(files, callback, {
                                    fileSize: '100kb'
                                })" />
                        </template>
                        <template v-if="item.slot.name">
                            <slot :name="item.slot.name" v-bind="{ formState: curdTable.edit.formState, item }"></slot>
                        </template>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>
<script lang="ts" setup>
import { defineComponent, reactive, inject, ref } from 'vue'
import { message } from 'ant-design-vue'
import { apiUploadImage } from '@/packages/service/upload'
// export default defineComponent({
//     props: {
//         curdTable: {
//             type: Object,
//             default: () => {
//             },
//         },
//     },
//     setup() {
//         const formRef = ref(null)
//         return {
//             formRef,
//         }
//     },
// })

const { curdTable } = defineProps({
    curdTable: {
        type: Object,
        default: () => {
        },
    }
})
const { getImageFullPath } = inject<any>('bagGlobal')
const onUploadImg = async (files: any, callback: Function, { fileSize }) => {
    const res = await Promise.all(
        Array.from(files).map((file: any) => {
            return new Promise((rev, rej) => {
                if ((file.size / 1024) < fileSize) {
                    message.error(`图片小于${fileSize}KB`)
                } else {
                    apiUploadImage(file).then((data: any) => {
                        rev(getImageFullPath(data))
                    }).catch((err: any) => {
                        rej(err)
                    })
                }
            })
        }),
    )
    callback(res.map((item: any) => item))
}

const formRef = ref(null)
</script>
