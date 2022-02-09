/*
  vue-jest has an issue when importing interfaces from "*.vue" files, it throws an error:
  "Module '"*.vue"' has no exported member 'XXXXXX'."

  There is an issue tracking this problem: https://github.com/vuejs/vue-jest/issues/189

  The workaround is to split exported interfaces into separate files.
  These types were previously on "VButton.vue"
 */

export type VButtonSize = 'big' | 'huge'
export type VButtonColor = 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'white' | 'dark' | 'light'
export type VButtonDark = '1' | '2' | '3' | '4' | '5' | '6'
