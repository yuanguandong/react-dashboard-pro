import React, { useState } from 'react';
import type { LayoutsIF } from '../package/dashboard';
import Dashboard from '../package/dashboard';
import allWidgets from '../widgets';

export default () => {
  const [layout, setLayout] = useState<LayoutsIF>([]);
  const onLayoutChange = (layout: LayoutsIF) => {
    setLayout(layout);
  };
  return (
    <Dashboard
      widgets={allWidgets}
      onLayoutChange={onLayoutChange}
      layout={layout}
    />
  );
};
