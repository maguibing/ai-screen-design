import TextMaterial from './component.vue'

export const textMaterial = {
  title: '文本',
  cover: '文本描述',
  group: 'info',

  schema: {
    type: 'text',
    name: '标题',
    layout: {
      width: 100,
      height: 100,
      x: 0,
      y: 0,
    },
    style: {
      color: 'red',
    },
    props: {
      content: 'Hello World',
    },
  }
}

export const install = (register) => {
  register(textMaterial, TextMaterial)
}
