export const categories = [
  {
    title: '信息',
    icon: 'mdi:information',
    key: 'info',
  },
  {
    title: '图表',
    icon: 'mdi:chart-box',
    key: 'chart',
  }
]
export const materials = []
/**
 * 获取所有分类
 * @returns 分类
 */
export const getCategories = () => {
  return categories
}

/**
 * 根据分类获取素材
 * @param group 分类
 * @returns 素材
 */
export const getMaterialsByCategory = (group: string) => {
  return materials.filter((item) => item.group === group)
}

/**
 * 注册素材
 * @param material 素材
 */
const componentsMap = new Map<string, Component>()
export function registerMaterials(material, component) {
  materials.push(material)
  componentsMap.set(material.schema.type, component)
}

/**
 * 获取组件
 * @param type 类型
 * @returns 组件
 */
export const getMaterialComponent = (type: string) => {
  return componentsMap.get(type)
}

const materialModules = import.meta.glob('./*/index.ts', { eager: true })
Object.values(materialModules).forEach((module) => {
  // @ts-expect-error 忽略类型错误
  module.install(registerMaterials)
})



/**
 * 创建节点
 * @param node 节点
 * @returns 节点
 */
export const createNode = (node) => {
  return {
    id: window.crypto.randomUUID(),
    ...node,
  }
}
