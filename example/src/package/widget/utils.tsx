import { Drawer } from 'antd';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaCog } from 'react-icons/fa';
// import allWidgets from '../../widgets';
//获取widget的类型
export const getWidgetType = (i: string, widgets: any): string => {
  console.log('widgets',widgets)
  let allWidgets = widgets;
  var widgetType = '';
  Object.keys(allWidgets).map((key) => {
    if (i.indexOf(key) >= 0) {
      widgetType = key;
    }
  });
  return widgetType;
};

//widget配置和删除按钮
export const ConfigBar = (props: any) => {
  const {
    widgetKey,
    editMode,
    onDeleteWidget,
    setConfigShow = () => {},
    widgets
  } = props;
  const widgetType = getWidgetType(widgetKey, widgets);
  return (
    <>
      {editMode && <div className={'react-dashboard-mask'}></div>}
      {editMode && _.get('widgets', widgetType + '.configComponent') && (
        <div
          className={'react-dashboard-configicon'}
          onClick={() => setConfigShow(true)}
        >
          <FaCog />
        </div>
      )}
      {editMode && (
        <div
          className={'react-dashboard-deleteicon'}
          onClick={() => onDeleteWidget()}
        >
          <AiOutlineDelete />
        </div>
      )}
    </>
  );
};

//config的容器
export const ConfigWrap = (props: any, widgets: any) => {
  const { widgetKey, visible, setVisible, width, children } = props;

  const afterVisibleChange = useCallback(
    (visible) => {
      if (visible) {
        const widgetConfigPanel =
          document.getElementsByClassName('widgetConfigPanel')[0];
        widgetConfigPanel &&
          widgetConfigPanel.addEventListener('mousedown', function (e) {
            e.stopPropagation();
          });
      } else {
        const widgetConfigPanel =
          document.getElementsByClassName('widgetConfigPanel')[0];
        widgetConfigPanel &&
          widgetConfigPanel.removeEventListener('mousedown', function (e) {
            e.stopPropagation();
          });
      }
    },
    [visible],
  );

  const title = useMemo(() => {
    if (!widgetKey) {
      return;
    }
    const widgetType = getWidgetType(widgetKey, widgets);
    return _.get(widgets, widgetType + '.name') + '设置';
  }, [widgetKey, widgets, getWidgetType]);

  useEffect(() => {
    afterVisibleChange(visible);
  }, [visible]);

  return (
    <>
      {visible && (
        <Drawer
          className="react-dashboard-widgetConfigPanel"
          title={title}
          placement="right"
          closable={true}
          onClose={() => setVisible(false)}
          visible={visible}
          width={width}
          bodyStyle={{ padding: '0px' }}
          afterVisibleChange={afterVisibleChange}
          zIndex={1005}
        >
          {children}
        </Drawer>
      )}
    </>
  );
};
