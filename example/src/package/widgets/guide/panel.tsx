import React from 'react';
import './index.less';

const widgetName = 'Guide';
const widgetClassName = 'react-dashboard-widget-' + widgetName;

const Widget = (props: any) => {
  const { height } = props;
  console.log('props',props)
  return <div className={widgetClassName}></div>;
};

export default Widget;
