import React from 'react';
import Dashboard from './dashboard';
import './style.less';
import allWidgets from './widgets';
export default () => {
  return (
    <Dashboard
      id={'default'}
      widgets={allWidgets}
      initialLayout={[]}
    />
    // <>1</>
  );
};
