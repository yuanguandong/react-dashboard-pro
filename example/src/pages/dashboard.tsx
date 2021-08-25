import React, { useRef } from 'react';
// import Dashboard from '../../../lib';
import Dashboard from '../package/dashboard';
import allWidgets from '../widgets';

export default () => {
  const ref = useRef<any>(null);
  return (
    <>
      <Dashboard
        id={'default'}
        widgets={allWidgets}
        initialLayout={[]}
        widgetWrapStyle={{
          borderRadius: 10,
          boxShadow: '0 3px 3px rgba(128,128,128,0.2)',
        }}
        ref={ref}
      />
    </>
  );
};
