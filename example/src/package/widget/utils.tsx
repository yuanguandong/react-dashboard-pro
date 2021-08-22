import { Drawer } from 'antd';
import React, { useCallback, useEffect, useMemo } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaCog } from 'react-icons/fa';
import allWidgets from '../widgets';
//获取widget的类型
export const getWidgetType = (i: string, widgets?: any): string => {
  let allWidgets = widgets

  var widgetType = '';
  Object.keys(allWidgets).map((key) => {
    if (i.indexOf(key) >= 0) {
      widgetType = key;
    }
  })
  return widgetType
}

//widget配置和删除按钮
export const ConfigBar = (props: any) => {
  const widgets = allWidgets
  const { widgetKey, editMode, handleDeleteWidget, showConfigBtn = true, setVisible = () => { } } = props;
  return (<>
    {editMode && <div className={'mask'}></div>}
    {
      showConfigBtn && editMode && widgets[getWidgetType(widgetKey, widgets)] && widgets[getWidgetType(widgetKey, widgets)].configPanel ?
        <div className={'configicon'} onClick={() => setVisible(true)}>
         <FaCog/>
        </div> : ''
    }
    {
      editMode && <div className={'deleteicon'}
        onClick={() => handleDeleteWidget()}>
        <AiOutlineDelete />
      </div>
    }
  </>)
}

//config的容器
export const ConfigWrap = (props: any) => {
  const widgets = allWidgets
  const { widgetKey, visible, setVisible, width, children } = props;

  const afterVisibleChange = useCallback((visible) => {
    if (visible) {
      const widgetConfigPanel = document.getElementsByClassName('widgetConfigPanel')[0]
      widgetConfigPanel && widgetConfigPanel.addEventListener('mousedown', function (e) { e.stopPropagation() })
    } else {
      const widgetConfigPanel = document.getElementsByClassName('widgetConfigPanel')[0]
      widgetConfigPanel && widgetConfigPanel.removeEventListener('mousedown', function (e) { e.stopPropagation() })
    }
  }, [visible])

  const title = useMemo(() => {
    if (!widgetKey) { return }
    return widgets[getWidgetType(widgetKey,widgets)]['name'] + '设置'
  }, [widgetKey, widgets, getWidgetType])

  useEffect(() => {
    afterVisibleChange(visible)
  }, [visible])

  return (<>{visible && <Drawer
    className="widgetConfigPanel"
    title={title}
    placement="right"
    closable={true}
    onClose={() => setVisible(false)}
    visible={visible}
    width={width}
    bodyStyle={{ padding: '0px' }}
    afterVisibleChange={afterVisibleChange}
    zIndex={1005}
    getContainer={() =>document.querySelector(".gant-layout") || document.body}
  >
    {children}
  </Drawer>}</>)
}



