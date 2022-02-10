import { Api, Api1, Api2,RefAPI, Code, Footer } from '@/components';
import { Code0, Code1, Code2, Code3, Code4,Npm } from '@/components/code/index';
import { Typography } from 'antd';
import React, { useState } from 'react';
import {
  Fa500Px,
  FaBootstrap,
  FaAdversal,
  FaAirbnb,
  FaAlipay,
  FaAmazon,
  FaAmazonPay,
  FaApple,
  FaAppStoreIos,
  FaBehanceSquare,
  FaGoogle,
  FaInstagramSquare,
  FaMagento,
  FaOpera
} from 'react-icons/fa';
import Background from 'smart-background';
import { Helmet } from 'umi';
// import Background from '../../package';
import packageInfo from '../config';
import Dashboard from './dashboard';
import Dashboard1 from './dashboard1';
import './index.less';
import Intro from './intro';

const { Title, Paragraph, Text, Link } = Typography;

const styles = {
  container: { width: '100%', position: 'relative', height: 350 },
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: 'rgba(0,0,0,0.5)',
    fontSize: 120,
  },
  img: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transform: 'scale(1.3)',
  },
  text: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
};

const icons = [
  <Fa500Px />,
  <FaApple />,
  <FaBootstrap />,
  <FaAdversal />,
  <FaAirbnb />,
  <FaAlipay />,
  <FaAmazonPay />,
  <FaAmazon />,
  <FaAppStoreIos />,
  <FaBehanceSquare />,
  <FaMagento />,
  <FaGoogle />,
  <FaInstagramSquare />,
  <FaOpera />,
];
const images = [
  'https://cdn.dribbble.com/users/1615584/screenshots/15210251/media/a52605dae1af2a9397d2a20e6b849c53.jpg?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/1615584/screenshots/15378686/media/cff7c84fa3b7113a8b6ba2a42ea86dd0.jpg?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/1615584/screenshots/15210251/media/a52605dae1af2a9397d2a20e6b849c53.jpg?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/2253180/screenshots/15774969/media/56a6cce1177146ed5450e877e7b84eca.jpg?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/1615584/screenshots/15252667/media/b80ad2ebdc5a6bc17e60ba6959c52817.jpg?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/2947819/screenshots/16219411/media/351ebff1fc8e7803d1e864bb32c56f4c.png?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/2253180/screenshots/15627123/media/3abcd7981e062604f751dd83bcada6e7.png?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/2253180/screenshots/15455950/media/bdb93831fb3685a34016f47aaa1d41c3.jpg?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/1615584/screenshots/15023587/media/9e7661bd6bc7eb447fcbb7e75bbd7fcb.jpg?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/2045817/screenshots/16111797/media/601e3f76be7420140cdf59c556233af7.png?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/1615584/screenshots/15216951/media/237d66ec9b350b60d70f09f77eec3f4a.jpg?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/1325623/screenshots/15831358/media/6b17ba172c1e4c4d1c4d704caa23b26a.png?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/1615584/screenshots/16007029/media/7f09e3adfac27a27718fa9bc5757b13a.jpg?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/1615584/screenshots/14995855/media/ca41b084c9c84e0aaf991aa87cffb771.jpg?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/2253180/screenshots/15627155/media/8bb9b30bb7277656c9e601633d0c308e.jpg?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/1615584/screenshots/14715367/media/b22718517b88736e01d0eeb8a0caade0.jpg?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/4832883/screenshots/15258503/media/d271d6558284ff84a8d8043d84621a8a.png?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/1615584/screenshots/14119591/media/481f74ce775606c4fcdc9129437cedaf.jpg?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/1615584/screenshots/14252559/media/353e9ac8e3959fedb929b6ff4cbba4c5.jpg?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/1294892/screenshots/15776389/media/77cee9466a19d2d22f847202ff97550e.png?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/297195/screenshots/14752281/media/5adba6f2997aecfb1c1d3c78b3586580.png?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/297195/screenshots/14723268/media/3141e4f10f008c028afbab86e864530f.png?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/2253180/screenshots/15332879/media/a15b519353be7afadb5796757f1fa1b1.jpg?compress=1&resize=300x300',
  'https://cdn.dribbble.com/users/4335179/screenshots/15265886/media/a49ee8db959987e8ed2b554abe961699.png?compress=1&resize=300x300',
];

interface IProps {}
const Index: React.FunctionComponent<IProps> = () => {
  const [collapsed, setCollapsed] = useState(false);
  const onCtrlB = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          React Dashboard Pro —— 一个开箱即用的一站式Dashboard解决方案
        </title>
        <link rel="canonical" href={packageInfo.homePageUrl} />
        {/* <link rel="shortcut icon" type="image/x-icon" href="/assets/logo.png?compress=1&resize=300x300" /> */}
      </Helmet>
      <div className="App">
        <a
          className="github"
          href={packageInfo.homePageUrl}
          target="_blank"
        ></a>
        <div style={{ width: '100%', height: '800px', position: 'relative' }}>
          <Background
            symbolsStyle={{ opacity: 1, transform: 'scale(1.5)' }}
            symbolSize={200}
            gap={0}
            symbols={[
              ...images.map((img) => (
                <div
                  style={{
                    ...styles.img,
                    backgroundImage: `url(${img})`,
                  }}
                />
              )),
            ]}
            childrenWrapStyle={{
              background: 'rgba(32,33,131,0.7)',
              paddingTop: 80,
            }}
            animation={{ type: 'top', speed: 5 }}
          >
            <a
              className="github"
              href={packageInfo.homePageUrl}
              style={{
                backgroundImage: `url(https://img.shields.io/github/stars/yuanguandong/${packageInfo.packageName}?style=social)`,
              }}
              target="_blank"
            ></a>
            <div className="alignCenter">
              <div className="">
                <div className="logo" style={{ color: '#fff' }}>
                  {packageInfo.symbol}
                </div>
                <span className="name" style={{ color: '#fff' }}>
                  {packageInfo.name}
                </span>
              </div>
            </div>
            <Intro />
          </Background>
        </div>
        <div className="wrap">
          <div
            className="container"
            style={{ background: 'rgba(250,250,250,0.3)' }}
          >
            <Dashboard />
          </div>

          <Title level={2}>介绍</Title>

          <Title level={5}>
            react-dashboard-pro
            是一套组件库也是一套解决方案，解决的是"千人千面"的B端几乎都要用到的Dashboard
            + Widget 客制化需求。
          </Title>
          <Title level={5}>
            动态可配置仪表板和动态”小程序市场“可以让每个用户非常方便的定制自己的仪表板，提升软件自由度和用户体验。
          </Title>
          <Title level={5}>
            react-dashboard-pro
            收敛了很多定制化的逻辑，简单的配置，约定式的widget编写规则可以让你开箱即用，
            如果本身的WidgetSelector和Toolbar不能满足业务和UI需求，那么可以用实例上的方法做到按需定制。
          </Title>
          

          <Title level={2}>安装</Title>
          <Code content={Npm} defaultOpen type="bash"/>

          <Title level={2} >使用示例</Title>

          <Code content={Code0} defaultOpen/>

          

          <Title level={2}>数据存储</Title>
          <Title level={5}>
            react-dashboard-pro
            数据可以在外部存储，也可以使用内置的localStorage内置存储方案，如果不传递layout,
            则内部默认开启内置localStorage存储
          </Title>
          <div
            className="container"
            style={{ background: 'rgba(128,128,128,0.05)' }}
          >
            <Dashboard1 />
          </div>

          <Code content={Code1} defaultOpen />
          <Title level={2}>Props</Title>
          <Api />

          <Title level={2} id="widget">
            Widget
          </Title>
          <Title level={5}>
            widget可以是开放式的任何内容，可以自由扩展，入口文件需要导出一个对象来描述这个widget,
            对象格式如下，更多widget可以看
            <a target="_blank" href={packageInfo.widgetRepository}>
              这里
            </a>
          </Title>
          <Api2 />
          <Code content={Code3} />

          <Title level={2} id="layout">
            Layout
          </Title>
          <Title level={5}>
            布局信息一般情况下不需要太关注，只需要序列化的存储下来即可，若想实时获取仪表板布局数据，可以聚焦（鼠标点击）到对应的仪表板，按快捷键{' '}
            <Text keyboard>Ctrl</Text>+<Text keyboard>Shift</Text>+
            <Text keyboard>C</Text>{' '}
            复制布局数据到剪切板，同时console面板也会打印出来布局数据
          </Title>
          <Api1 />
          <Code content={Code2} />

          <Title level={2} id="layout">
            实例方法
          </Title>
          <Title level={5}>
            可通过ref获取组件实例，实例对象上挂载了一些方法和dom对象，可以方便拓展自定义的Toolbar和WidgetSelector
          </Title>
          <RefAPI />
          <Code content={Code4} />

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
