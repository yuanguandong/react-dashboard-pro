import { Column } from '@ant-design/charts';
import { EllipsisOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React from 'react';
import { List } from './data';
import './index.less';
const widgetName = 'Column';
const widgetClassName = 'react-dashboard-widget-' + widgetName;
const { Title } = Typography;
const Widget = (props: any) => {
  const { height } = props;

  const config = {
    data: List,
    xField: 'type',
    yField: 'sales',
    padding: [50, 30, 80, 30],
    color: '#f52248',
    columnStyle: {
      radius: [20, 20, 20, 20],
    },
    legend: false,
    minColumnWidth: 10,
    maxColumnWidth: 10,
  };
  return (
    <div className={widgetClassName}>
      <div className={widgetClassName + '-title-wrap'}>
        <div className={widgetClassName + '-title'}>{widgetName}</div>
        <EllipsisOutlined style={{ fontSize: 24 }} />
      </div>
      <Column {...config} />
    </div>
  );
};

export default Widget;
