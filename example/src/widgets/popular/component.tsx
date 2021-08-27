import {
  CloseCircleOutlined,
  EllipsisOutlined,
  EyeOutlined
} from '@ant-design/icons';
import _ from 'lodash';
import React, { useState } from 'react';
import { List } from './data';
import './index.less';

const widgetName = 'Popular';
const widgetClassName = 'react-dashboard-widget-' + widgetName;
const Widget = (props: any) => {
  const { height } = props;

  const [activeItem, setActiveItem] = useState<any>(null);

  const onItemClick = (e: React.MouseEvent, item: any) => {
    setActiveItem(item);
  };

  const isActive = (item: any) => {
    return activeItem && _.get(activeItem, 'id') === item.id;
  };

  const onClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveItem(null);
  };


  return (
    <div className={widgetClassName}>
      <div
        className={widgetClassName + '-hero'}
        style={{
          backgroundImage:
            'url(https://hbimg.huabanimg.com/01308dcce96f800014c94ee8b06038db43766744109ea4-Njdiqp_fw658/format/webp)',
          opacity: activeItem ? 0 : 1,
          height: activeItem ? 0 : 200,
          marginBottom: activeItem ? 0 : 10,
        }}
      ></div>
      <div className={widgetClassName + '-list'}>
        {List.map((item) => (
          <div
            className={widgetClassName + '-item'}
            key={item.id}
            onClick={(e) => onItemClick(e, item)}
            style={{
              opacity: activeItem ? (isActive(item) ? 1 : 0) : 1,
              height: activeItem ? (isActive(item) ? 'auto' : 0) : 'auto',
              flexDirection: activeItem
                ? isActive(item)
                  ? 'column'
                  : 'row'
                : 'row',
              marginBottom: activeItem ? 0 : 10,
            }}
          >
            <div
              className={widgetClassName + '-img'}
              style={{
                backgroundImage: `url(${item.img})`,
                width: activeItem
                  ? isActive(item)
                    ? '100%'
                    : '100px'
                  : '100px',
                height: activeItem
                  ? isActive(item)
                    ? '200px'
                    : '60px'
                  : '60px',
              }}
            />
            <div className={widgetClassName + '-content'}>
              <div className={widgetClassName + '-title'}>
                <div
                  className={widgetClassName + '-left'}
                  style={{
                    fontSize: activeItem
                      ? isActive(item)
                        ? '24px'
                        : '16px'
                      : '16px',
                  }}
                >
                  {item.title}
                </div>
                <div className={widgetClassName + '-right'}>
                  <EllipsisOutlined />
                </div>
              </div>
              <div className={widgetClassName + '-desc'}>
                <div className={widgetClassName + '-left'}>{item.desc}</div>
                <div className={widgetClassName + '-right'}>
                  <EyeOutlined /> {item.view}
                </div>
              </div>
              <div
                className={widgetClassName + '-body'}
                style={{
                  height: activeItem ? (isActive(item) ? 'auto' : '0') : '0',
                  opacity: activeItem ? (isActive(item) ? 1 : 0) : 0,
                }}
              >
                {item.body}
                <div className={widgetClassName + '-close'}>
                  <CloseCircleOutlined onClick={onClose} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Widget;
