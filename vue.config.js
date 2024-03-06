// import { defineConfig } from '@vue/cli-service';

// module.exports = defineConfig({
//   transpileDependencies: [
//     'element-plus',
//   ]
// });
// Se utilizează CommonJS pentru importuri
const { defineConfig } = require('@vue/cli-service');

// Exportarea configurației folosind module.exports
module.exports = defineConfig({
  transpileDependencies: [
    'element-plus',
  ]
});
