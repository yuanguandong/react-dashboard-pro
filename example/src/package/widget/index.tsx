import _ from 'lodash';
import React, { useState } from 'react';
import './index.less';
import { ConfigBar } from './utils';
interface WidgetProps {
  widgets: any;
  widgetKey: string;
  widgetType: string;
  widgetHeight: number;
  editMode: boolean;
  onDeleteWidget?: Function;
  [key: string]: any;
}

//widget渲染器
const Widget = (props: WidgetProps) => {
  const {
    widgets,
    widgetKey,
    widgetType,
    widgetHeight,
    editMode,
    onDeleteWidget,
  } = props;
  const [configShow, setConfigShow] = useState(false);
  const component = _.get(widgets, widgetType + '.component');
  const configComponent = _.get(widgets, widgetType + '.configComponent');
  return (
    <div className="react-dashboard-widget">
      {component &&
        React.createElement(component, {
          ...props,
        })}
      <ConfigBar
        widgetKey={widgetKey}
        editMode={editMode}
        onDeleteWidget={onDeleteWidget}
        setConfigShow={setConfigShow}
      />
      {configComponent && React.createElement(configComponent, {
        ...props,
        visible: configShow,
        setVisible:setConfigShow
      })}
    </div>
  );
};

export default Widget;
