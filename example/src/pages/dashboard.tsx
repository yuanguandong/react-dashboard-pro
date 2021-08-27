import React, { useRef } from 'react';
// import Dashboard from '../../../lib';
import Dashboard from '../package/dashboard';
import allWidgets from '../widgets';
import initialLayout from './layout';
export default () => {
  const ref = useRef<any>(null);
  return (
    <>
      <Dashboard
        id={'default'}
        widgets={allWidgets}
        initialLayout={initialLayout}
        layout={[
          {
            w: 3,
            h: 16,
            x: 0,
            y: 0,
            i: 'Popular-81735522335293475546087951289435',
          },
        ]}
        widgetWrapStyle={{
          borderRadius: 10,
          boxShadow: '0 3px 3px rgba(128,128,128,0.2)',
        }}
        ref={ref}
      />
    </>
  );
};
