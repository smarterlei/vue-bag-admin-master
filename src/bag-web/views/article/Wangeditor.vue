<template>
    <div id="editor">
        <md-editor previewTheme="mk-cute" codeTheme="paraiso" theme="dark" v-if="detailData" @onUploadImg="onUploadImg"
            v-model="detailData.content" />
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import axios from 'axios'
export default defineComponent({
    props: {
        detailData: {
            type: Object,
            default: {}
        }
    },
    components: {
        MdEditor
    },
    setup() {


        // 图片上传事件 
        const onUploadImg = async (files, callback) => {
            console.log("in", files)
            const res = await Promise.all(
                files.map((file) => {
                    return new Promise((rev, rej) => {
                        // 传给后端一个FormData数据，添加键值对，这里我添加了这个文章的ID和file
                        const form = new FormData();
                        form.append('file', file);
                        form.append("articleId", 5)
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
            content: '# 哎哎哎',
            onUploadImg,
            MdEditor
        }
    },
})
</script>
