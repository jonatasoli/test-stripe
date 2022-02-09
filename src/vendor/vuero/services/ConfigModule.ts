// import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
//
// import LayoutConfigTypes from '@/core/config/LayoutConfigTypes'
// import { Mutations } from '@/store/enums/StoreEnums'
// import layoutConfig from '@/core/config/DefaultLayoutConfig'
// import merge from 'deepmerge'
//
// interface StoreInfo {
//   config: LayoutConfigTypes
//   initial: LayoutConfigTypes
// }
//
// @Module
// export default class ConfigModule extends VuexModule implements StoreInfo {
//   config = layoutConfig
//   initial = layoutConfig;
//
//   // get layoutConfig() {
//   //   return (path, defaultValue) => {
//   //     // const objectPath = require("object-path");
//   //     // return objectPath.get(this.config, path, defaultValue);
//   //     return true
//   //   }
//   // }
//
//   @Mutation
//   [Mutations.SET_LAYOUT_CONFIG](payload): void {
//     this.config = payload
//   }
//
//   @Mutation
//   [Mutations.RESET_LAYOUT_CONFIG]() {
//     this.config = Object.assign({}, this.initial)
//   }
//
//   @Mutation
//   [Mutations.OVERRIDE_LAYOUT_CONFIG](): void {
//     this.config = this.initial = Object.assign(
//       {},
//       this.initial,
//       JSON.parse(window.localStorage.getItem('config') || '{}')
//     )
//   }
//
//   @Mutation
//   [Mutations.OVERRIDE_PAGE_LAYOUT_CONFIG](payload): void {
//     this.config = merge(this.config, payload)
//   }
// }
