<template>
    <router-view />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {

    },
})
</script>
<style lang="less">
html,
body {
    background: #f4f6f8;
    font-size: var(--bag-font-size-base);
}

.ucommnet .select-none .item:nth-child(2) {
    display: none;
}
</style>
