import { CSSProperties } from 'vue'

declare module 'vue' {
  interface CSSProperties {
    '--primary': string
    '--white': string
    '--dark': string
    '--link': string
    '--info': string
    '--success': string
    '--warning': string
    '--danger': string
  }
}
