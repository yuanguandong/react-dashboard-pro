/*
 * @Descripttion: 从业务页面发送到仪表板的下拉按钮，业务组件
 * @MainAuthor: 袁官东
 */
import { Button, Dropdown, Menu, Tooltip } from "antd";
import _ from "lodash";
import React from "react";
import { getDvaApp } from "umi";
import { addWidget } from "../../utils";

interface sendToDashboardProps {
  type: string;
  name: string;
  configParams: any;
  [propsName: string]: any;
}

const Comp = (props: sendToDashboardProps) => {
  const { type, name, configParams, className } = props;

  const { menu } = getDvaApp()["_store"].getState();

  const handleSend = (dashboard: object) => {
    addWidget(dashboard, type, name, configParams);
  };

  const addMenu = () => (
    <Menu>
      {_.isArray(menu["dashboards"]) &&
        !_.isEmpty(menu["dashboards"]) &&
        menu["dashboards"].map((item: any) => (
          <Menu.Item onClick={() => handleSend(item)}>{item["name"]}</Menu.Item>
        ))}
    </Menu>
  );
  return (
    <>
      {!menu["singleDashboard"] ? (
        <Dropdown
          overlay={addMenu}
          placement="bottomCenter"
          getPopupContainer={(triggerNode) =>
            document.querySelector(".gant-layout") ||
            triggerNode ||
            document.body
          }
        >
          <Tooltip title={"发送到仪表板"}>
            <Button
              size="small"
              icon="rocket"
              type="primary"
              className={className}
            />
          </Tooltip>
        </Dropdown>
      ) : (
        <Tooltip title={"发送到首页仪表板"}>
          <Button
            size="small"
            icon="rocket"
            type="primary"
            className={className}
            onClick={() => handleSend({ id: "default", name: "仪表板" })}
          />
        </Tooltip>
      )}
    </>
  );
};

export default Comp;
