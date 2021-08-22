// import { updateApi as modifySmartChartConfig } from '@/pages/common/widgets/smartchart/service'
import { Button, message, notification } from 'antd';
import React from 'react';
import { history } from 'umi';
import { generateUuid } from '../utils';
import widgets from '../widgets';
import { fetch, update } from './service';

const maxWidgetLength = 20;

//添加widget
export const addWidget = async (
  dashboard: any,
  type: string,
  title: string,
  configParams: any,
) => {
  if (!dashboard || !type) {
    return;
  }
  const widget = widgets[type];
  const response = await fetch({ id: dashboard['id']});
  let currentLayout = [];
  if (response && response.bigData) {
    currentLayout = JSON.parse(response.bigData).currentLayout;
  }
  if (currentLayout.length >= maxWidgetLength) {
    message.warning('超过了最大限制数量20' + ',' + '不能再添加了');
  }
  const widgetKey = type + '-' + generateUuid(10, 10);
  const lastItem = currentLayout[currentLayout.length - 1];
  const newLayout = [
    ...currentLayout,
    {
      w: widget.size.defaultWidth,
      h: widget.size.defaultHeight,
      x: 0,
      y: lastItem ? lastItem.y + lastItem.h : 0,
      i: widgetKey,
      minW: widget.size.minWidth,
      maxW: widget.size.maxWidth,
      minH: widget.size.minHeight,
      maxH: widget.size.maxHeight,
    },
  ];

  await update({
    id: dashboard['id'],
    data: {
      currentLayout: newLayout,
    },
  });

  notification['success']({
    message: '发送成功',
    description: (
      <div>
        {'请到仪表板'}[
        <div
          style={{
            color: 'var(--primary-color)',
            display: 'inline',
            cursor: 'pointer',
          }}
          onClick={() => {
            history.push(`/dashboard/${dashboard['id']}`);
            notification.destroy();
          }}
        >
          {dashboard['name']}
        </div>
        ]{'调整布局'}
      </div>
    ),
    btn: (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          history.push(`/dashboard/${dashboard['id']}`);
          notification.destroy();
        }}
      >
        {'立即前往'}
      </Button>
    ),
  });
};

export const request = async (url:string, options:any) => {
  const {
    method,
    data: { dataId, dataType, bigData },
  } = options;
  let res;

  switch (method) {
    case 'POST':
      localStorage.setItem(`${dataId}-${dataType}`, bigData);
      break;
    case 'GET':
      res = localStorage.getItem(`${dataId}-${dataType}`);
      break;
    case 'DELETE':
      localStorage.removeItem(`${dataId}-${dataType}`);
  }

  res = localStorage.getItem(`${dataId}-${dataType}`);

  return res;
};
