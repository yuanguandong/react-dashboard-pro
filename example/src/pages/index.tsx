import { Api, Code, Code0, Footer } from '@/components';
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
import Dashboard from '../package';
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
    backgroundPosition:'center',
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
        <link rel="shortcut icon" type="image/x-icon" href="/assets/logo.png" />
      </Helmet>
      <div className="App">
        <a
          className="github"
          href={packageInfo.homePageUrl}
          target="_blank"
        ></a>
        <div style={{ width: '100%', height: '500px',position:'relative' }}>
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
          childrenWrapStyle={{background:'rgba(0,0,0,0.5)',paddingTop:80}}
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
          
          <div className="container">
            <Dashboard />
          </div>
          {/* <Title level={2}>Easy To Use 容易使用</Title> */}
          <Paragraph>默认以圆点作为符号</Paragraph>
          <Code content={Code0} />
          <Title level={2}>Why 为什么？</Title>
          在开发过程中，我们经常会遇到使用背景的地方，比如登录页面，用户信息页面，封面图……
          寻找契合业务主题的背景十分耗费精力，总觉得做的背景不合适，如果直接用图片呢，逻辑是比较简单，但寻找到一张契合业务主题的图片也不是那么容易，所以想到用符号生成幕布一样的背景，从这个出发点做了这个组件，滚动的图片墙可能这个需求比较常见，用SmartBackground可以很快速的实现，希望可以帮到您，别忘了star哟
          <Title level={2}>Props</Title>
          <Api />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
