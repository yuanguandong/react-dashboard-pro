import React from 'react';

interface WidgetProps {
  widgets: any;
  widgetKey: string;
  widgetType: string;
  itemHeight: number;
  editMode: boolean;
  handleDeleteWidget?: Function;
}

//widget渲染器
const Widget = (props: WidgetProps) => {
  const {
    widgets,
    widgetKey,
    widgetType,
    itemHeight,
    editMode,
    handleDeleteWidget,
  } = props;
  return React.createElement(widgets[widgetType]['component'], {
    widgets,
    widgetKey,
    widgetType,
    itemHeight,
    editMode,
    handleDeleteWidget,
  });
};

export default Widget;
