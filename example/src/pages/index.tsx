import {
  Api,
  Code,
  Code0, Footer
} from '@/components';
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
  FaInstagramSquare, FaMagento,
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
          Smart Background —— An React Component Automatically generate the
          background
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

        <Background
          style={{ width: '100%', height: '500px' }}
          underlayColor="#0252D9"
          symbolsStyle={{
            color: '#000',
            opacity: '0.3',
          }}
          animation={{ type: 'top', speed: 5 }}
          gap={20}
          symbols={icons}
        >
          <a
            className="github"
            href={packageInfo.homePageUrl}
            style={{
              backgroundImage: `url(https://img.shields.io/github/stars/yuanguandong/${packageInfo.packageName}?style=social)`,
            }}
            target="_blank"
          ></a>
        </Background>

        <div className="wrap">
          <div className="alignCenter">
            <div className="">
              {/* <img className="logoImage" src={Logo} alt="react-keyevent" /> */}
              <div className="logo" style={{ color: '#fff' }}>
                {packageInfo.symbol}
              </div>
              <span className="name" style={{ color: '#fff' }}>
                Smart Background
              </span>
            </div>
          </div>
          <Intro />
          <div className="container">
            <Dashboard/>
        
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
