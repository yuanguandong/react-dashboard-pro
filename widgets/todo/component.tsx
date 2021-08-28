import { EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Progress, Typography } from 'antd';
import React from 'react';
import { List } from './data';
import './index.less';
const widgetName = 'Todo';
const widgetClassName = 'react-dashboard-widget-' + widgetName;
const { Title } = Typography;

const Widget = (props: any) => {
  const { height } = props;
  return (
    <div className={widgetClassName}>
      <div className={widgetClassName + '-title-wrap'}>
        <div className={widgetClassName + '-title'}>{widgetName}</div>
        <EllipsisOutlined style={{ fontSize: 24 }} />
      </div>
      {List.map((item) => (
        <div className={widgetClassName + '-item'} key={item.title}>
          <Title level={4}>{item.title}</Title>
          <div className={widgetClassName + '-content'}>{item.content}</div>
          <div className={widgetClassName + '-content'}>progress</div>
          <Progress
            percent={item.process}
            strokeColor={{
              '0%': '#f52248',
              '100%': 'blue',
            }}
          />
          {item.users.map((user) => (
            <Avatar src={user.avatar} size={24} style={{ marginRight: 5 }} key={user.name}/>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Widget;
