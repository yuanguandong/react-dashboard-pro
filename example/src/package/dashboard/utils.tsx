// import { updateApi as modifySmartChartConfig } from '@/pages/common/widgets/smartchart/service'
import { Button, message, notification } from 'antd'
import React from 'react'
import { history } from 'umi'
import { generateUuid, getModelData } from '../utils'
import { fetch, update } from './service'
const maxWidgetLength = 20

//添加widget
export const addWidget = async (dashboard: any, type: string, title: string, configParams: any) => {
  const widgets = getModelData('config.WIDGETS')
  if (!dashboard || !type) { return }
  const widget = widgets[type]
  const response = await fetch({ id: dashboard['id'], type: 'user' })
  let currentLayout = []
  if (response && response.bigData) {
    currentLayout = JSON.parse(response.bigData).currentLayout;
  }
  if (currentLayout.length >= maxWidgetLength) {
    message.warning('超过了最大限制数量20' + ',' + '不能再添加了')
  }
  const widgetKey = type + '-' + generateUuid(10, 10);
  const lastItem = currentLayout[currentLayout.length - 1];
  const newLayout = [...currentLayout, {
    "w": widget.rect.defaultWidth,
    "h": widget.rect.defaultHeight,
    "x": 0,
    "y": lastItem ? lastItem.y + lastItem.h : 0,
    "i": widgetKey,
    "minW": widget.rect.minWidth,
    "maxW": widget.rect.maxWidth,
    "minH": widget.rect.minHeight,
    "maxH": widget.rect.maxHeight,
  }]

  await update({
    id: dashboard['id'],
    type: 'user',
    data: {
      currentLayout: newLayout
    }
  })

  notification['success']({
    message: '发送成功',
    description: <div>
      {'请到仪表板'}
      [<div
        style={{ color: 'var(--primary-color)', display: 'inline', cursor: 'pointer' }}
        onClick={() => {
          history.push(`/dashboard/${dashboard['id']}`)
          notification.destroy()
        }}
      >
        {dashboard['name']}
      </div>]
        {'调整布局'}
    </div>,
    btn: <Button
      type="primary"
      size="small"
      onClick={() => {
        history.push(`/dashboard/${dashboard['id']}`)
        notification.destroy()
      }}
    >
      {'立即前往'}
    </Button>
  });
}

