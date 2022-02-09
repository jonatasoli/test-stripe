export interface NavbarItemApiJson {
  name: string
  title: string
  show_in_menu: boolean

  menu_order: number | null
  category_order: number | null
  category: string | null | undefined
}

interface NavbarApiJson {
  settings: NavbarItemApiJson[]
}

/**
 * Transform the api result into expected
 * Navbar definition prop
 *
 * @param {NavbarApiJson} json
 * @returns {object[]}
 */
export function useNavbarAdapter(json: NavbarApiJson) {
  try {
    const { settings } = json
    const validItems = settings.filter(item => item.show_in_menu)

    const sortedItems = validItems.sort((current, next) => {
      const { category_order: currentCategoryOrder, menu_order: currentMenuOrder, title: currentTitle } = current
      const { category_order: nextCategoryOrder, menu_order: nextMenuOrder, title: nextTitle } = next

      const safeCurrentCategoryOrder = currentCategoryOrder || 0
      const safeNextCategoryOrder = nextCategoryOrder || 0
      const safeCurrentMenuOrder = currentMenuOrder || 0
      const safeNextMenuOrder = nextMenuOrder || 0

      if (safeCurrentCategoryOrder > safeNextCategoryOrder) {
        return 1
      }

      if (safeCurrentCategoryOrder < safeNextCategoryOrder) {
        return -1
      }

      if (safeCurrentMenuOrder > safeNextMenuOrder) {
        return 1
      }

      if (safeCurrentMenuOrder < safeNextMenuOrder) {
        return -1
      }

      if (currentTitle > nextTitle) {
        return 1
      }

      if (currentTitle < nextTitle) {
        return -1
      }

      return 0
    })

    const itemsMap = sortedItems.reduce((bucket, currentItem) => {
      const { category, name, title } = currentItem
      const definition = { title, name }

      if (!category) {
        bucket.set(currentItem.title, definition)
        return bucket
      }

      const currentCategoryChildren = bucket.get(category)?.children || []
      const newCategoryDefinition = { title: category, children: [...currentCategoryChildren, definition] }
      bucket.set(category, newCategoryDefinition)

      return bucket
    }, new Map())

    const itemsMapKeys = [...itemsMap.keys()]
    return itemsMapKeys.map(key => itemsMap.get(key))
  } catch {
    return []
  }
}
