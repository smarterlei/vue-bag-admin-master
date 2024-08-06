export default [
    {
        title: '用户昵称',
        dataIndex: 'username',
        ellipsis: true,
        align: 'center',
        curd: {
            el: 'a-input',
            $formItemAttrs: {
                autoLink: false,
                label: '用户昵称',
                name: 'name',
                rules: [{ required: true, message: '输入用户昵称' }],
            },
            $elAttrs: { placeholder: '输入用户昵称', value: '' },
        },
    },
    {
        title: '留言的文章',
        dataIndex: 'detail',
        align: 'center',
        ellipsis: true,
        customRender: (detail: any) => {
            console.log('render', detail.value)
            return detail.value ? detail.value.title : ''
        },
    },
    {
        title: '地址',
        dataIndex: 'address',
        align: 'center',
        ellipsis: true,
        curd: {
            el: 'a-input',
            $formItemAttrs: {
                autoLink: false,
                label: '用户地址',
                name: 'email',
                rules: [{ required: true, message: '输入用户地址' }],
            },
            $elAttrs: { placeholder: '输入用户地址', value: '' },
        },
    },
    {
        title: '点赞数量',
        dataIndex: 'likes',
        align: 'center',
        ellipsis: true,
        curd: {
            el: 'a-input',
            $formItemAttrs: {
                autoLink: false,
                label: '点赞数量',
                name: 'url',
            },
            $elAttrs: { placeholder: '输入点赞数量', value: '' },
        },
    },
    {
        title: '留言记录',
        dataIndex: 'content',
        ellipsis: true,
        align: 'center',
        curd: {
            el: 'a-textarea',
            $formItemAttrs: {
                autoLink: false,
                label: '留言记录',
                name: 'content',
            },
            $elAttrs: { placeholder: '输入留言记录', value: '', maxlength: 300 },
        },
    },
    {
        title: '是否显示',
        dataIndex: 'shows',
        key: 'shows',
        ellipsis: true,
        align: 'center',
        width: 100,
        customRender: (item: any) => {
            return item.text ? '是' : '否'
        },
        curd: {
            el: 'a-switch',
            $formItemAttrs: {
                autoLink: false,
                label: '是否显示',
                name: 'shows',
            },
            $elAttrs: {
                checkedText: '是',
                uncheckedText: '否',
                checked: true,
            },
        },
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
        ellipsis: true,
        width: 200,
    },
    {
        title: '操作',
        key: 'action',
        align: 'center',
        width: 200,
        slot: { name: 'action' },
    },
]
