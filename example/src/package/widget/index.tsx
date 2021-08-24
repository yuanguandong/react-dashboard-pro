import classnames from 'classnames';
import _ from 'lodash';
import React, { useState } from 'react';
import './index.less';
import { ConfigBar } from './utils';
interface WidgetProps {
  widgets: any;
  widgetKey: string;
  widgetType: string;
  height: number;
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
    editMode,
    onDeleteWidget,
    widgetWrapClassName,
    widgetWrapStyle,
  } = props;
  const [configShow, setConfigShow] = useState(false);
  const component = _.get(widgets, widgetType + '.component');
  const configComponent = _.get(widgets, widgetType + '.configComponent');
  return (
    <div
      className={classnames(widgetWrapClassName, 'react-dashboard-widget')}
      style={widgetWrapStyle}
    >
      {component &&
        React.createElement(component, {
          ...props,
        })}
      <ConfigBar
        widgetKey={widgetKey}
        editMode={editMode}
        onDeleteWidget={onDeleteWidget}
        setConfigShow={setConfigShow}
        widgets={widgets}
      />
      {configComponent &&
        React.createElement(configComponent, {
          ...props,
          visible: configShow,
          setVisible: setConfigShow,
        })}
    </div>
  );
};

export default Widget;
