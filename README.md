# React Dashboard Pro
[![npm version](https://badge.fury.io/js/react-dashboard-pro.svg)](#) [![npm version](https://img.shields.io/badge/react-%3E16-green)](#) [![npm version](	https://img.shields.io/github/issues/yuanguandong/react-dashboard-pro)](#) [![npm version](	https://img.shields.io/github/forks/yuanguandong/react-dashboard-pro)](#) [![npm version](https://img.shields.io/github/license/yuanguandong/react-dashboard-pro)](#) [![npm version](	https://img.shields.io/github/stars/yuanguandong/react-dashboard-pro)](#)
## 开箱即用的一站式仪表板解决方案
只需简单几步即可拥有动态仪表板功能  

解决的是"千人千面"的B端几乎都要用到的Dashboard + Widget 客制化需求。

![repository-open-graph-template副本](./snapshot.png)

## Repository
https://github.com/yuanguandong/react-dashboard-pro

## Live demo
https://yuanguandong.github.io/react-dashboard-pro/

[![alt text](https://codesandbox.io/static/img/play-codesandbox.svg "在线编辑")](https://codesandbox.io/s/react-dashboard-pro-demo-6doss?file=/src/App.tsx)

## Install
```bash
npm i react-dashboard-pro -S

git clone git@github.com:yuanguandong/react-widgets.git
```

## DownLoad widget
```bash
npm i widgets-cli -D
npx widgets-cli
```

## widget store
https://yuanguandong.github.io/react-widgets/


## How to use
```js
import React, { useState } from 'react';
import type { LayoutsIF } from 'react-dashboard-pro';
import Dashboard from 'react-dashboard-pro';
import allWidgets from '../widgets';

export default () => {
  const [layout, setLayout] = useState<LayoutsIF>([]);
  const onLayoutChange = (layout: LayoutsIF) => {
    setLayout(layout);
  };
  return (
    <Dashboard
      widgets={allWidgets}
      onLayoutChange={onLayoutChange}
      layout={layout}
    />
  );
};
```

## Props

| property            | description                      | type                                                                              | defaultValue | required |
| ------------------- | -------------------------------- | --------------------------------------------------------------------------------- | ------------ | -------- |
| widgets             | 可选的小程序对象集合             | { \[key: string\]:<a href="#widget">widget</a>}                                   |              | true     |
| editMode            | 是否编辑状态                     | boolean                                                                           | false        | false    |
| defaultLayout       | 默认布局                         | <a href="#layout">layoutItem</a>[]                                                | []           | false    |
| widgetWrapClassName | widget容器类名                   | string                                                                            |              | false    |
| widgetWrapStyle     | widget容器样式                   | React.CSSProperties                                                               |              | false    |
| layout              | 布局数据                         | <a href="#layout">layoutItem</a>[]                                                | null         | false    |
| minHeight           | 最小高度                         | number                                                                            | 300          | false    |
| maxWidgetLength     | 当前仪表板最大可添加的widget数量 | number                                                                            | 20           | false    |
| toolbar             | 是否显示默认工具栏               | {type: 'left' \| 'right' \| 'top' \| 'bottom'; speed: number;}                    | true         | false    |
| storageKey          | 本地存储唯一标识                 | boolean                                                                           | 'default'    | false    |
| onLayoutChange      | 布局改变的回调                   | (layout: LayoutsIF) => void                                                       |              | false    |
| onReset             | 清空按钮的回调                   | (dirtyCurrentLayout: LayoutsIF, currentLayout: LayoutItem) => void                |              | false    |
| onRemoveWidget      | 删除小程序的回调                 | (widget: widgetIF,dirtyCurrentLayout: LayoutsIF,currentLayout: LayoutsIF) => void |              | false    |
| onAddWidget         | 添加小程序的回调                 | (widget: widgetIF,dirtyCurrentLayout: LayoutsIF,currentLayout: LayoutsIF) => void |              | false    |
| onReload            | 刷新按钮的回调                   | (currentLayout: LayoutsIF) => void                                                |              | false    |
| onCancelEdit        | 取消编辑的回调                   | (dirtyCurrentLayout: LayoutsIF,currentLayout: LayoutItem) => void                 |              | false    |
| onEdit              | 进入编辑的回调                   | (currentLayout: LayoutsIF) => void                                                |              | false    |
| onSave              | 保存按钮的回调                   | (currentLayout: LayoutsIF) => void                                                |              | false    |
| onRevert            | 恢复按钮的回调                   | (dirtyCurrentLayout: LayoutsIF, currentLayout: LayoutItem) => void                |              | false    |

## Widget
widget可以是开放式的任何内容，可以自由扩展，入口文件需要导出一个对象来描述这个widget, 对象格式如下，更多widget可以看<a href="https://github.com/yuanguandong/react-widgets" target="_blank">这里</a>
> 预设的widget基本都依赖了antd,使用了less, 注意依赖的安装 


| property        | description                          | type                                                                                                               | defaultValue | required |
| --------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ------------ | -------- |
| name            | 小程序名称                           | string                                                                                                             |              | true     |
| description     | 小程序描述                           | string                                                                                                             |              | true     |
| tags            | 标签，被用作小程序选择器分类依据     | string[]                                                                                                           |              | true     |
| component       | 小程序组件                           | ReactElement                                                                                                       |              | true     |
| configComponent | 小程序对应的配置组件                 | ReactElement                                                                                                       |              | true     |
| maxLength       | 该小程序在当前仪表板最大可添加数量   | number                                                                                                             |              | true     |
| snapShot        | 小程序快照图片，用于小程序选择器显示 | ImageBitmapSource                                                                                                  |              | true     |
| icon            | 小程序图标，用于小程序选择器显示     | ReactElement                                                                                                       |              | true     |
| iconBackground  | 小程序图标背景，用于小程序选择器显示 | string                                                                                                             |              | true     |
| size            | 小程序尺寸信息                       | {defaultWidth: number;defaultHeight: number;maxWidth: number;maxHeight: number;minWidth: number;minHeight: number} |              | true     |


```tsx
// todo/index.tsx
import { CalendarOutlined } from '@ant-design/icons';
import Panel from './component';
import snapShot from './snapshot.png';

export default {
  name: 'Todo',
  description: 'todo list',
  tags: ['all','list'],
  component: Panel,
  configComponent: null,
  maxLength: 2,
  snapShot,
  icon: <CalendarOutlined />,
  iconBackground: 'linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%)',
  size: {
    defaultWidth: 3,
    defaultHeight: 11,
    maxWidth: 12,
    maxHeight: 16,
    minWidth: 2,
    minHeight: 4,
  },
}
// **/**.index ……

// widgets/index.tsx
import Clock from './clock';
import Column from './column';
import Guide from './guide';
import Popular from './popular';
import Ring from './ring';
import Todo from './todo';

export default{ Clock,Guide,Popular,Todo,Column,Ring };

```


## Layout
布局信息一般情况下不需要太关注，只需要序列化的以字符串方式存储下来即可，若想实时获取仪表板布局数据（比如要设置默认布局时），可以聚焦（鼠标点击）到对应的仪表板，按快捷键 <Text keyboard>Ctrl</Text>+<Text keyboard>Shift</Text>+<Text keyboard>C</Text> 复制布局数据到剪切板，同时console面板也会打印出来布局数据

| property | description                                                      | type   | defaultValue | required |
| -------- | ---------------------------------------------------------------- | ------ | ------------ | -------- |
| i        | 唯一标识, 以小程序的唯一标识加中划线开头，如 'widgetKey-1234567' | string |              | true     |
| w        | 宽度份数，总共12份                                               | number |              | true     |
| h        | 高度份数，1份大概30px                                            | number |              | true     |
| x        | 横向位置，总共12份                                               | number |              | true     |
| y        | 纵向位置，1份大概30px                                            | number |              | true     |
| minW     | 最小宽度                                                         | number |              | true     |
| maxW     | 最大宽度                                                         | number |              | true     |
| minH     | 最小高度                                                         | number |              | true     |
| maxH     | 最大高度                                                         | number |              | true     |

```js
export default [
  {
    w: 3,
    h: 16,
    x: 0,
    y: 0,
    i: 'Popular-81735522335293475546087951289435',
  },
  {
    w: 3,
    h: 11,
    x: 3,
    y: 5,
    i: 'Todo-53084247679600442035440807237732',
  }
]
```


## 实例方法
可通过ref获取组件实例，实例对象上挂载了一些方法和dom对象，可以方便拓展自定义的Toolbar和WidgetSelector

| property     | description | type                |
| ------------ | ----------- | ------------------- |
| dom          | DOM对象     | HTMLDivElement      |
| addWidget    | 添加小程序  | (widget)=>void      |
| removeWidget | 删除小程序  | (i:widgetKey)=>void |
| reload       | 刷新        | ()=>void            |
| edit         | 进入编辑    | ()=>void            |
| cancelEdit   | 取消编辑    | ()=>void            |
| revert       | 重置        | ()=>void            |
| save         | 保存        | ()=>void            |

```js
import React,{useRef} from 'react';
import Dashboard from 'react-dashboard-pro';
import allWidgets from '../widgets';

export default () => {
  const ref = useRef()
  const addWidget = ()=>{
    ref.current.addWidget('Todo-1234567')
  }
  return (<>
      <Dashboard
        ref={ref}
        widgets={allWidgets}
      />
      <button onClick={addWidget}>新增</button>
    </>
  );
};
```

## Todo
✅ configPanel 

☑️ gap 

☑️ modern theme 

☑️ dark theme 

☑️ more widget

☑️ widget-cli

☑️ 国际化

## The End

* 欢迎大家提issue, 有需求我会尽力满足大家的痛点
* 这个项目我会一直维护下去，大家放心使用

觉得有用的话点个star吧 🙊

