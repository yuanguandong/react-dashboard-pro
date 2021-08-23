import React from 'react';
import Dashboard from '../package/dashboard';
import allWidgets from '../package/widgets';

export default () => {
  return (
    <Dashboard
      id={'default'}
      widgets={allWidgets}
      initialLayout={[]}
      widgetWrapStyle={{
        borderRadius: 10,
        boxShadow: '0 3px 3px rgba(128,128,128,0.2)',
      }}
    />
  );
};
