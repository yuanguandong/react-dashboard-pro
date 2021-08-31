export default `import React,{useRef} from 'react';
import Dashboard from 'react-dashboard-pro';
import allWidgets from '../widgets';

export default () => {
  const ref = useRef()
  const addWidget = ()=>{
    ref.current.addWidget('Todo-1234567')
  }
  return (<>
      <Dashboard
        ref={ref}
        widgets={allWidgets}
      />
      <button onClick={addWidget}>新增</button>
    </>
  );
};
`;
