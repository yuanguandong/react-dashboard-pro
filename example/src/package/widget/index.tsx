import React from 'react';

interface WidgetProps {
  widgets: any;
  widgetKey: string;
  widgetType: string;
  widgetHeight: number;
  editMode: boolean;
  onDeleteWidget?: Function;
  [key:string]:any;
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
  return React.createElement(widgets[widgetType]['component'], {
    ...props
  });
};

export default Widget;
