import message from 'ant-design-vue/es/message'
import themeColor from './themeColor.js'
const themeList = [
  {
    key: '薄暮', color: '#F5222D'
  },
  {
    key: '火山', color: '#FA541C'
  },
  {
    key: '日暮', color: '#FAAD14'
  },
  {
    key: '明青', color: '#13C2C2'
  },
  {
    key: '极光绿', color: '#52C41A'
  },
  {
    key: '拂晓蓝（默认）', color: '#1890FF'
  },
  {
    key: '极客蓝', color: '#2F54EB'
  },
  {
    key: '酱紫', color: '#722ED1'
  }
]
const themeList2 = [
    {
        name: '默认',
        path: 'default'
    },
    {
        name: '薄暮',
        path: 'dusk'
    },
    {
        name: '火山',
        path: 'volcano'
    },
    {
        name: '日暮',
        path: 'eventide'
    },
    {
        name: '明清',
        path: 'ming'
    }
]

const tabStyles = [
    {name: '默认', value: 1},
    {name: '圆点', value: 2},
    {name: '卡片', value: 3}
]

const updateTheme = newPrimaryColor => {
    const hideMessage = message.loading('正在切换主题！', 0)
    themeColor.changeColor(newPrimaryColor).finally(() => {
      setTimeout(() => {
        hideMessage()
      }, 10)
    })
  }

export {
    themeList,
    updateTheme,
    tabStyles
}
