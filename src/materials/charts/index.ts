export const barMaterial =
{
  title: '柱状图',
  cover: '柱状图描述',
  group: 'chart',
  schema: {
    type: 'bar',
    name: '柱状图',
    layout: {
      width: 100,
      height: 100,
      x: 0,
      y: 0,
    },
    props: {
      options: {}
    },
  },
}

export const install = (register) => {
  register(barMaterial)
}
