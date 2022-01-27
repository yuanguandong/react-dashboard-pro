import { defineConfig } from 'umi';

let { BASE } = process.env;

console.log(BASE)

export default defineConfig({
  hash:true,
  favicon: './logo.png',
  publicPath: BASE,
  base: BASE,
  nodeModulesTransform: {
    type: 'none',
  },
  antd:{},
  devtool:'source-map',
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/widget', component: '@/pages/dashboard' },
  ],
  fastRefresh: {},
  outputPath:BASE==='/' ? '../netlify': '../docs',
  mfsu:{}
});
