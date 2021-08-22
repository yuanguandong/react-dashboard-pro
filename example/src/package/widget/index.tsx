import React from 'react';

interface WidgetProps {
  widgets: any;
  widgetKey: string;
  widgetType: string;
  itemHeight: number;
  editMode: boolean;
  handleDeleteWidget?: Function;
  [key:string]:any;
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
    ...props
  });
};

export default Widget;
