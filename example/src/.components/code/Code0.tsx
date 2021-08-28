export default `import React from 'react';
import Dashboard from 'react-dashboard-pro';
import allWidgets from '../widgets';

export default () => {
  return (
    <Dashboard
      widgets={allWidgets}
    />
  );
};
`;