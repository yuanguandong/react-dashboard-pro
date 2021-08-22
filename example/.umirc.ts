import { defineConfig } from 'umi';

let { BASE } = process.env;

console.log(BASE)

export default defineConfig({
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
  ],
  fastRefresh: {},
  outputPath:BASE==='/' ? '../netlify': '../docs' 
});
