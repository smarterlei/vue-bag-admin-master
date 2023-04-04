<template>
    <bag-curd-plus :curdTable="curd.curdTable">
    </bag-curd-plus>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import columns from './columns'
import { toTree } from '@/packages/utils/utils'
import { findChildrenDepth } from '@/packages/utils/lodash'
import initCurd, { createTableHock } from '@/packages/hook/tablePlus'

export default defineComponent({
    setup() {
        const defaultCurdTable = initCurd()
        defaultCurdTable.apiPrefix = '/branch'
        const curd = createTableHock({ columns, curdTable: defaultCurdTable })
        const compData = reactive({})
        defaultCurdTable.all.afterRequest = function(res) {
            columns.forEach((item: any) => {
                if (item.dataIndex === 'pid') {
                    const treeData = toTree(res)
                     treeData.unshift({ name: '请选择', id: 0 })
                        item.curd.$elAttrs.treeData = treeData
                    // const options = res.map((todo) => {
                    //     return { label: todo.name, value: todo.id }
                    // })
                    // options.unshift({ label: '请选择', value: '' })
                    // item.curd.$elAttrs.options = options
                }
            })
            const dataSource = toTree(res)
            console.log('data-source',dataSource)
            return { dataSource, total: dataSource.length }
        }
        return {
            compData,
            curd,
        }
    },
})
</script>
