import React, { useRef, useState } from 'react';
import type { LayoutsIF } from '../package/dashboard';
// import Dashboard from '../../../lib';
import Dashboard from '../package/dashboard';
import allWidgets from '../widgets';

export default () => {
  const ref = useRef<any>(null);
  const [layout, setLayout] = useState<LayoutsIF>([]);
  const onLayoutChange = (layout: LayoutsIF) => {
    setLayout(layout);
  };
  return (
    <>
      <Dashboard
        widgets={allWidgets}
        // initialLayout={initialLayout}
        onLayoutChange={onLayoutChange}
        layout={layout}
        widgetWrapStyle={{
          borderRadius: 10,
          boxShadow: '0 3px 3px rgba(128,128,128,0.2)',
        }}
        ref={ref}
      />
    </>
  );
};
