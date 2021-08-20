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
  const { widgetType, widgets } = props;
  return (
    <>
      {React.createElement(widgets[widgetType]['component'], { ...props })}
    </>
  )
}

export default Widget