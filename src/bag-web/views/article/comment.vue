<template>
  <u-comment class="ucommnet" :config="config" @submit="submit" @like="like" relative-time>
    <!-- <template>导航栏卡槽</template> -->
    <!-- <template #info>用户信息卡槽</template> -->
    <!-- <template #card>用户信息卡片卡槽</template> -->
    <!-- <template #opearte>操作栏卡槽</template> -->
  </u-comment>
  <!-- <span>{{ config.user.username }}</span> -->
</template>
  
<script setup lang="ts">
// 下载表情包资源emoji.zip https://readpage.lanzouy.com/b04duelxg 密码:undraw

import emoji from "./emoji";
import { reactive, ref } from "vue";
import {
  CommentApi,
  ConfigApi,
  SubmitParamApi,
  UToast,
  createObjectURL,
  dayjs,
} from "undraw-ui";

import { userUserinfo, webLeaveAll, webLeaveAdd,webLeaveUpdate } from "@/bag-web/service/app";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();

const items = ref([]);

const config = reactive<ConfigApi>({
  user: {
    id: 1,
    username: "", // 默认没有登录用户
    avatar:
      "https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100",
    // 评论id数组 建议:存储方式用户uid和评论id组成关系,根据用户uid来获取对应点赞评论id,然后加入到数组中返回
    likeIds: [1, 2, 3],
  },
  emoji: emoji,
  comments: [],
  total: 10,
});
 const getList=()=>{
  webLeaveAll({ articleId: route.params.id }).then((res: any) => {
  let messageOnline = res.map((item: any) => {
    return {
      id: item.id,
      parentId: null,
      likes: item.likes,
      uid: item.id,
      address: item.address,
      content: item.content,
      createTime: item.createTime,
      user: {
        username: item.username,
        avatar: "/api" + item.userhead,
        level: 6,
        homeLink: "/1",
      },
    };
  });
  
  config.comments = messageOnline;
});
 }
 getList()

const router = useRouter();

userUserinfo()
  .then((res: any) => {
    console.log(res, "user-info");
    config.user.username = res.username;
    config.user.avatar = "/api" + res.userhead;
  })
  .catch((err) => {});
let temp_id = 100;
// 提交评论事件
const submit = async ({
  content,
  parentId,
  files,
  finish,
  reply,
}: SubmitParamApi) => {
  let str =
    "提交评论:" +
    content +
    ";\t父id: " +
    parentId +
    ";\t图片:" +
    files +
    ";\t被回复评论:";
  console.log(str, reply,content);
  const resp = await userUserinfo;

  let userhead: string = config.user.avatar.replace("/api", "");

  if (config.user.username) {
    webLeaveAdd({
      content,
      username: config.user.username,
      userhead,
      articleId: route.params.id,
    }).then((res) => {});
    /**
     * 上传文件后端返回图片访问地址，格式以'||'为分割; 如:  '/static/img/program.gif||/static/img/normal.webp'
     */
    let contentImg = files?.map((e) => createObjectURL(e)).join("||");

    temp_id += 1;
    const comment: CommentApi = {
      id: String(temp_id),
      parentId: parentId,
      uid: config.user.id,
      address: "来自江苏",
      content: content,
      likes: 0,
      createTime: dayjs().subtract(5, "seconds").toString(),
      contentImg: contentImg,
      user: {
        username: config.user.username,
        avatar: config.user.avatar,
        level: 6,
        homeLink: `/${temp_id}`,
      },
      reply: null,
    };
    setTimeout(() => {
      finish(comment);
      UToast({ message: "评论成功!", type: "info" });
    }, 200);
  } else {
    UToast({ message: "您还没有登录!", type: "error" });

    setTimeout(() => {
      router.push("/login");
    }, 2000);
    return false;
  }
};
// 点赞按钮事件 将评论id返回后端判断是否点赞，然后在处理点赞状态
const like = (id: string,likes:number ,userhead, finish: () => void) => {
  console.log("点赞: " + id,config.comments);
  let oldLikes:any= config.comments.find(item=>item.id==id)
 
  webLeaveUpdate({

      userhead,
      articleId: route.params.id,
      likes:oldLikes.likes*1+1,
      id
    }).then((res) => {
      UToast({ message: "点赞成功!", type: "success" });
      getList()
    });
  // setTimeout(() => {
  //   finish();
  // }, 200);
};
</script>
<style lang="less" scoped></style>