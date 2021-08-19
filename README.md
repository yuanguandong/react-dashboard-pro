# Smart Background
[![npm version](https://badge.fury.io/js/smart-background.svg)](#) [![npm version](https://img.shields.io/badge/react-%3E16-green)](#) [![npm version](	https://img.shields.io/github/issues/yuanguandong/smart-background)](#) [![npm version](	https://img.shields.io/github/forks/yuanguandong/smart-background)](#) [![npm version](https://img.shields.io/github/license/yuanguandong/smart-background)](#) [![npm version](	https://img.shields.io/github/stars/yuanguandong/smart-background)](#)
### An React Component Can Automatically Generate The Background
一个快速生成元素背景的react组件

![repository-open-graph-template副本](./snapshot.png)


### Live demo
https://yuanguandong.github.io/smart-background/

### Install
```bash
npm i smart-background -S
```

### How to use
```js
import React from 'react';
import Background from 'smart-background';
import { FaLaugh } from 'react-icons/fa';

export default () => {
  return (
    <div style={styles.container}>
      <Background underlayColor="#f00" animation={{ type: 'bottom', speed: 5 }}>
        <div style={styles.content}>
          <FaLaugh style={styles.icon} />
          <h1 style={styles.text}>JUST DO IT</h1>
        </div>
      </Background>
    </div>
  );
};

const styles = {
  container: { width: '100%', position: 'relative', height: 350 },
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  icon: { color: '#fff', fontSize: 120 },
  text: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
};
```

### Props

| property              | description                | type                                                           | defaultValue                    | required |
| --------------------- | -------------------------- | -------------------------------------------------------------- | ------------------------------- | -------- |
| symbols               | 元素/字符/符号集合         | (string \| ReactNode    \| Element)[ ]                         | ['●']                           | false    |
| random                | 符号是否随机生成位置和大小 | { fontSizeRange: number[] } \| undefined                       |                                 | false    |
| underlayColor         | 底衬颜色                   | string                                                         |                                 | false    |
| underlayImage         | 底衬图片                   | string                                                         |                                 | false    |
| symbolsStyle          | 符号样式                   | Object                                                         | {color: '#000', opacity: '0.3'} | false    |
| rotate                | 符号旋转角度               | number                                                         | 0                               | false    |
| symbolSize            | 符号大小                   | number                                                         | 90                              | false    |
| gap                   | 符号间距                   | number                                                         | 10                              | false    |
| animation             | 滚动动画                   | {type: 'left' \| 'right' \| 'top' \| 'bottom'; speed: number;} |                                 | false    |
| exact                 | 精确模式                   | boolean                                                        | false                           | false    |
| childrenWrapClassName | 子组件容器类名             | string                                                         |                                 | false    |
| childrenWrapStyle     | 子组件容器类名             | React.CSSProperties                                            |                                 | false    |
