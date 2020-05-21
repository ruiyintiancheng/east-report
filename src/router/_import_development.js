// import systemManagement from 'system-management-ry'
// console.log(systemManagement)
// const components = systemManagement
// module.exports = file => {
//   console.log(file)
//   //   if (file.startWith('$')) {
//   //     return components[file]
//   //   } else {
//   return require('@/views/' + file + '.vue').default // vue-loader at least v13.0.0+
// //   }
// }
module.exports = file => require('@/views/' + file + '.vue').default // vue-loader at least v13.0.0+

