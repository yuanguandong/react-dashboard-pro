import { Button } from 'antd';
import React from 'react';
import './index.less';
const widgetName = 'Guide';
const widgetClassName = 'react-dashboard-widget-' + widgetName;

const Widget = (props: any) => {
  const { height } = props;
  return (
    <div className={widgetClassName}>
      <div className={widgetClassName + '-title'}>Update Your Plan</div>
      <div className={widgetClassName + '-content'}>
        You haven’t had an update plan for a long time, it’s time to update
      </div>
      <Button shape="round" className={widgetClassName + '-button'}>Update Plan</Button>
    </div>
  );
};

export default Widget;
