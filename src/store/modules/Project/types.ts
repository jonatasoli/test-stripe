export interface Project {
  namespace: string
  theme: Theme
  routes: Array<Route>
  name: string
}

export interface Route {
  id: number
  url: string
  name: string
  friendlyName: string
  settings: RouteSettings
}

export interface RouteSettings {
  category?: string
  category_order: number | null
  menu_order: number | null
  private: boolean
  screen: Screen
  'show-in-menu': boolean
}

export interface Screen {
  layoutType: number
  sections: Array<Section>
}

export interface Section {
  id: number
}

export interface Theme {
  primary: string
  white: string
  dark: string
  link: string
  primaryMedium: string
  primaryLight: string
  secondary: string
  accent: string
  accentMedium: string
  accentLight: string
  success: string
  info: string
  warning: string
  danger: string
  purple: string
  blue: string
  green: string
  yellow: string
  orange: string
  lightText: string
  fadeGrey: string
}
