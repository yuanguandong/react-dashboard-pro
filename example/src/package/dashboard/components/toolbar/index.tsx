import classNames from 'classnames';
import React from 'react';
import './style';
export interface ToolBarPropsIF {
  extraLeft?: React.ReactNode;
  extraRight?: React.ReactNode;
  style?: React.HTMLAttributes<HTMLDivElement>;
  className?: string;
  fixed?: boolean;
}

const prefixCls = 'react-dashboard-toolbar';

const Toolbar = (props: ToolBarPropsIF) => {
  const { extraLeft, extraRight, fixed, className, style } = props;
  return (
    <div className={classNames(prefixCls, fixed ? `${prefixCls}-fixed` : '', className)} style={style}>
      <div className={`${prefixCls}-left`}>{extraLeft}</div>
      <div className={`${prefixCls}-space`}></div>
      <div className={`${prefixCls}-right`}>{extraRight}</div>
    </div>
  );
};

export default Toolbar;
