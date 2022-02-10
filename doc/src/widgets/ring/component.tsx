import { RingProgress } from '@ant-design/charts';
import { EllipsisOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import './index.less';
const widgetName = 'Ring';
const widgetClassName = 'react-dashboard-widget-' + widgetName;
const { Title } = Typography;
const Widget = (props: any) => {
  const { height } = props;

  var config = {
    autoFit: true,
    percent: 0.6,
    color: ['#F4664A', '#E8EDF3'],
    innerRadius: 0.8,
    radius: 0.98,
    statistic: {
      title: {
        style: {
          color: '#363636',
          fontSize: '12px',
          lineHeight: '14px',
        },
        formatter: function formatter() {
          return 'Progress';
        },
      },
    },
  };

  return (
    <div className={widgetClassName}>
      <div className={widgetClassName + '-title-wrap'}>
        <div className={widgetClassName + '-title'}>{widgetName}</div>
        <EllipsisOutlined style={{ fontSize: 24 }} />
      </div>
      <RingProgress {...config} style={{height:height-80}}/>
    </div>
  );
};

export default Widget;
