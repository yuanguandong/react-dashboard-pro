import { Api, Api1, Api2, Code, Code0, Code1, Code2, Code3, Footer } from '@/components';
import { Typography } from 'antd';
import React, { useState } from 'react';
import {
  Fa500Px,
  FaAdobe,
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
  <FaAdobe />,
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
  'https://hbimg.huabanimg.com/fd96f248fc148615ddfc47f4878c9c6faa1f44e0805fb-FE039l_fw658/format/webp',
  'https://hbimg.huabanimg.com/28b7fa3dfa092b6da73174391ef0c387e8fc42fffcba9-NpUPuG_fw658/format/webp',
  'https://hbimg.huabanimg.com/0dc20d8fe1fabb39184e91fe3811998bad8ab72eea39a-yauPGJ_fw658/format/webp',
  'https://hbimg.huabanimg.com/9a428dd11ecb30aeae5d1f52e4a0ef446f8d24161310e-OYobtd_fw658/format/webp',
  'https://hbimg.huabanimg.com/3740a4a22f95c71dabc904480cfd232a8961d0fa4fbba-jtoOUa_fw658/format/webp',
  'https://hbimg.huabanimg.com/1f28f9567dcd2938893cbca0cbabd2cf1b2d938b5c174-KWwyrP_fw658/format/webp',
  'https://hbimg.huabanimg.com/eb23a1b5f1fed937276dd3295ce07d7b5625132a195051-PkJYOb_fw658/format/webp',
  'https://hbimg.huabanimg.com/f48e29827e4800268a3e160b0dfa1524c47a12cbd1ba3-UN275A_fw658/format/webp',
  'https://hbimg.huabanimg.com/35a54ec1334e50e8de8e08d518105e63e5e0d9338236d-0joFUt_fw658/format/webp',
  'https://hbimg.huabanimg.com/d1d0bb7f29eb34e4cc83c15c373643ea0d91617c1c23eb-A93wCR_fw658/format/webp',
  'https://hbimg.huabanimg.com/49c4e6cf8dfb99a68f0b6b68ff23a7e1a3c3903835183-LM4QJL_fw658/format/webp',
  'https://hbimg.huabanimg.com/18f762933cbb540d15972db232c54ff9b7002165653c1b-DHUmlw_fw658/format/webp',
  'https://hbimg.huabanimg.com/d765e303684e26aef25efaed0b735d9f41e57c3818124-akgLhX_fw658/format/webp',
  'https://hbimg.huabanimg.com/0470e96effca0776c8b223ed3f39114a752fc5527b43a-bCVmXH_fw658/format/webp',
  'https://hbimg.huabanimg.com/5b5919b6352cc3c8372e7d329c6d858dd6ce0750309e36-KuvqvD_fw658/format/webp',
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
        {/* <link rel="shortcut icon" type="image/x-icon" href="/assets/logo.png" /> */}
      </Helmet>
      <div className="App">
        <a
          className="github"
          href={packageInfo.homePageUrl}
          target="_blank"
        ></a>
        <div style={{ width: '100%', height: '800px', position: 'relative' }}>
          <Background
            symbolsStyle={{ opacity: 1 }}
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
              background: 'rgba(32,33,131,0.8)',
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
                {/* <img className="logoImage" src={Logo} alt="react-keyevent" /> */}
                <div className="logo" style={{ color: '#fff' }}>
                  {packageInfo.symbol}
                </div>
                <span className="name" style={{ color: '#fff' }}>
                  React Dashboard Pro
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
          <Code content={Code0} />
          <Title level={2}>介绍</Title>


          <Title level={5}>
            react-dashboard-pro
            是一套组件库也是一套解决方案，解决的是"千人千面"的B端几乎都要用到的Dashboard + Widget 客制化需求。
          </Title>
          <Title level={5}>
            动态可配置仪表板和动态”小程序市场“可以让每个用户非常方便的定制自己的仪表板，提升软件自由度和用户体验。
          </Title>
          <Title level={5}>
            react-dashboard-pro
            收敛了很多定制化的逻辑，简单的配置，约定式的widget编写规则可以让你开箱即用，
            如果本身的WidgetSelector和Toolbar不能满足业务和UI需求，那么可以用实例上的方法做到按需定制。
          </Title>
          
          <Title level={2}>数据存储</Title>
          <Title level={5}>
            react-dashboard-pro 数据可以在外部存储，也可以使用内置的localStorage内置存储方案，如果不传递layout, 则内部默认开启内置localStorage存储
          </Title>
          <div
            className="container"
            style={{ background: 'rgba(128,128,128,0.05)' }}
          >
            <Dashboard1 />
          </div>


          <Code content={Code1} defaultOpen/>
          <Title level={2}>Props</Title>
          <Api />


          


          <Title level={2} id="widget">Widget</Title>
          <Title level={5}>
            widget可以是开放式的任何内容，可以自由扩展，入口文件需要导出一个对象来描述这个widget, 对象格式如下，更多widget可以看<a target="_blank" href={packageInfo.widgetRepository}>这里</a>
           
          </Title>
          <Api2 />
          <Code content={Code3} />

          <Title level={2}>Layout</Title> 
          <Title level={5}>
            布局信息一般情况下不需要太关注，只需要序列化的存储下来即可，若想实时获取仪表板布局数据，可以聚焦（鼠标点击）到对应的仪表板，按快捷键 <Text keyboard>Ctrl</Text>+<Text keyboard>Shift</Text>+<Text keyboard>C</Text> 复制布局数据到剪切板，同时console面板也会打印出来布局数据
           
          </Title>
          <Api1 />
          <Code content={Code2} />
          
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
