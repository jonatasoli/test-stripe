// import { Actions } from '@/store/enums/StoreEnums'
// import { config } from '@/core/helpers/config'
// import objectPath from 'object-path'
// import store from '@/store/'
//
// class LayoutService {
//   /**
//    * initialize default layout
//    */
//   public static init(): void {
//     LayoutService.initLayout()
//     LayoutService.initHeader()
//     LayoutService.initAside()
//     LayoutService.initFooter()
//   }
//
//   /**
//    * init layout
//    */
//   public static initLayout(): void {
//     store.dispatch(Actions.ADD_BODY_ATTRIBUTE, {
//       qulifiedName: 'id',
//       value: 'kt_body'
//     })
//
//     if (objectPath.get(config.value, 'loader.display')) {
//       store.dispatch(Actions.ADD_BODY_CLASSNAME, 'page-loading-enabled')
//       store.dispatch(Actions.ADD_BODY_CLASSNAME, 'page-loading')
//     }
//   }
//
//   /**
//    *  init header
//    */
//   public static initHeader(): void {
//     if (objectPath.get(config.value, 'header.fixed.desktop')) {
//       store.dispatch(Actions.ADD_BODY_CLASSNAME, 'header-fixed')
//     }
//
//     if (objectPath.get(config.value, 'header.fixed.tabletAndMobile')) {
//       store.dispatch(Actions.ADD_BODY_CLASSNAME, 'header-tablet-and-mobile-fixed')
//     }
//   }
//
//   /**
//    *  init aside
//    */
//   public static initAside(): void {
//     if (!objectPath.get(config.value, 'aside.display')) {
//       return
//     }
//
//     // Enable aside
//     store.dispatch(Actions.ADD_BODY_CLASSNAME, 'aside-enabled')
//
//     // Minimized
//     if (objectPath.get(config.value, 'aside.minimized') && objectPath.get(config.value, 'aside.toggle')) {
//       store.dispatch(Actions.ADD_BODY_ATTRIBUTE, {
//         qulifiedName: 'data-kt-aside-minimize',
//         value: 'on'
//       })
//     }
//
//     if (objectPath.get(config.value, 'aside.fixed')) {
//       // Fixed aside
//       store.dispatch(Actions.ADD_BODY_CLASSNAME, 'aside-fixed')
//     }
//
//     if (objectPath.get(config.value, 'aside.secondaryDisplay')) {
//       // aside Secondary Enabled
//       store.dispatch(Actions.ADD_BODY_CLASSNAME, 'aside-secondary-enabled')
//     }
//
//     // Default minimized
//     if (objectPath.get(config.value, 'aside.minimized')) {
//       store.dispatch(Actions.ADD_BODY_ATTRIBUTE, {
//         qulifiedName: 'data-kt-aside-minimize',
//         value: 'on'
//       })
//     }
//   }
//
//   /**
//    *  init footer
//    */
//   public static initFooter(): void {
//     // Fixed header
//     if (objectPath.get(config.value, 'footer.width') === 'fixed') {
//       store.dispatch(Actions.ADD_BODY_CLASSNAME, 'footer-fixed')
//     }
//   }
// }
//
// export default LayoutService
