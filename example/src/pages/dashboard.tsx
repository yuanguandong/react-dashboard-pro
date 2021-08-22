import React from 'react';
import Dashboard from '../package/dashboard';
import allWidgets from '../package/widgets';

export default () => {
  return <Dashboard id={'default'} widgets={allWidgets} initialLayout={[]} />;
};
