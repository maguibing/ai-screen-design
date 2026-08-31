export const categories = [
  {
    title: '图表',
    icon: 'mdi:chart-box',
    key: 'chart',
  },
  {
    title: '信息',
    icon: 'mdi:information',
    key: 'info',
  },
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
export function registerMaterials(material) {
  materials.push(material)

}

const materialModules = import.meta.glob('./*/index.ts', { eager: true })
Object.values(materialModules).forEach((module) => {
  // @ts-expect-error 忽略类型错误
  module.install(registerMaterials)
})

