<template>
    <bag-curd-plus :curdTable="curd.curdTable"></bag-curd-plus>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import columns from './columns'
import initCurd, { createTableHock } from '@/packages/hook/tablePlus'

export default defineComponent({
    setup() {
        const defaultCurdTable = initCurd()
 
        defaultCurdTable.all.api = '/web/leave/page'
        defaultCurdTable.apiPrefix = '/web/leave'
        defaultCurdTable.all.isPage = true
        const curd = createTableHock({ columns, curdTable: defaultCurdTable })
        return {
            curd,
        }
    },
})
</script>
