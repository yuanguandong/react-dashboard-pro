import {
  AppstoreAddOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Badge, Button, Empty, Input, List, Modal } from 'antd';
import classnames from 'classnames';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import './index.less';

const Search = Input.Search;

const WidgetSelector = (props: any) => {
  const {
    widgets,
    currentLayout,
    addWidget,
    children = (
      <Button
        size="small"
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginLeft: '10px' }}
      >
        {'添加'}
      </Button>
    ),
  } = props;

  const [stateWidgets, setStateWidgets] = useState(widgets);
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState(500);
  const [width, setWidth] = useState<any>(860);
  const [menuData, setMenuData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [keywords, setKeywords] = useState('');

  //计算是否还可添加
  const canBeAdd = (widget: any) => {
    if (widget.length < Number(widget['maxLength'])) {
      return true;
    } else {
      return false;
    }
  };

  //计算左侧菜单
  const handleCalcMenuData = useCallback(
    (widgets) => {
      let tags: string[] = [];
      Object.keys(widgets).map((key) => {
        tags.push(...widgets[key]['tags']);
      });
      const tempObj: any = {};
      tags.map((item) => {
        if (tempObj[item]) {
          tempObj[item]['count']++;
        } else {
          tempObj[item] = {
            title: item,
            count: 1,
          };
        }
      });
      const menuData: any = [];
      Object.keys(tempObj).map((key, index, arr) => {
        menuData.push(tempObj[key]);
      });
      setMenuData(menuData);
    },
    [menuData],
  );

  //菜单变化
  const handleMenuChange = useCallback(
    (item, index) => {
      setActiveIndex(index);
      let temp: any = {};
      Object.keys(widgets).map((key) => {
        if (widgets[key]['tags'].indexOf(menuData[index]['title']) >= 0) {
          temp[key] = widgets[key];
        }
      });
      setStateWidgets(temp);
    },
    [widgets, menuData],
  );

  //查询
  const handleSearch = useCallback(
    (value) => {
      let temp: any = {};
      Object.keys(widgets).map((key) => {
        if (widgets[key]['name'].indexOf(value) >= 0) {
          temp[key] = widgets[key];
        }
      });
      handleCalcMenuData(temp);
      setStateWidgets(temp);
      setKeywords(value);
    },
    [widgets, menuData, handleCalcMenuData],
  );

  useEffect(() => {
    handleCalcMenuData(widgets);
  }, []);

  useEffect(() => {
    let newStateWidgets = _.cloneDeep(stateWidgets);
    Object.keys(newStateWidgets).map((key) => {
      newStateWidgets[key].length = 0;
    });
    currentLayout.map((item: any) => {
      Object.keys(newStateWidgets).map((key) => {
        if (item['i'].indexOf(key) >= 0) {
          newStateWidgets[key].length = newStateWidgets[key].length + 1;
        }
      });
    });
    setStateWidgets(newStateWidgets);
  }, [currentLayout]);

  return (
    <>
      <div
        style={{ display: 'inline-block' }}
        onClick={() => {
          setVisible(true);
        }}
      >
        {children}
      </div>
      <Modal
        width={width}
        centered
        title={
          <>
            <AppstoreAddOutlined style={{ margin: '0 5px' }} />
            {'选择小程序'}
          </>
        }
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
        bodyStyle={{ padding: 0 }}
        zIndex={1006}
      >
        <div className={'react-dashboard-widget-wrap'}>
          <div className={'react-dashboard-widget-leftBar'}>
            <Search
              placeholder={'请输入小程序名称'}
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              prefix={
                <SearchOutlined
                  className={'react-dashboard-widget-searchIcon'}
                />
              }
              allowClear
            />
            <List
              itemLayout="horizontal"
              style={{ marginTop: '10px' }}
              dataSource={menuData}
              renderItem={(item: any, index: number) => (
                <List.Item
                  className={classnames(
                    'react-dashboard-widget-item',
                    activeIndex == index ? 'react-dashboard-widget-active' : '',
                  )}
                  onClick={() => handleMenuChange(item, index)}
                >
                  <div className={'react-dashboard-widget-name'}>
                    {item['title']}
                  </div>
                  <div className={'react-dashboard-widget-Badge'}>
                    <Badge count={item['count']} />
                  </div>
                </List.Item>
              )}
            />
          </div>
          <div
            className={classnames('react-dashboard-widget-Layer')}
            style={{
              height: height - 2,
            }}
          >
            {!_.isEmpty(stateWidgets) ? (
              <div
                className="react-dashboard-widget-waterfall"
                style={{ columnCount: Math.ceil((width - 200) / 200) }}
              >
                {Object.keys(stateWidgets).map((key) => (
                  <div
                    key={key}
                    className={classnames('react-dashboard-widget-item')}
                  >
                    <img
                      src={stateWidgets[key]['snapShot']}
                      className={'react-dashboard-widget-shortcut'}
                    />
                    <div className={'react-dashboard-widget-bottombar'}>
                      <div
                        className={'react-dashboard-widget-iconWrap'}
                        style={{
                          backgroundColor: _.get(
                            stateWidgets,
                            key + '.iconBackground',
                          ),
                          backgroundImage: _.get(
                            stateWidgets,
                            key + '.iconBackground',
                          ),
                        }}
                      >
                        {stateWidgets[key].icon}
                      </div>
                      <div className={'react-dashboard-widget-name'}>
                        {stateWidgets[key].name}
                      </div>
                      <div className={'react-dashboard-widget-description'}>
                        {stateWidgets[key].description}
                      </div>
                    </div>
                    <div className={'react-dashboard-widget-mask'}>
                      {canBeAdd(stateWidgets[key]) ? (
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<PlusOutlined />}
                          size="large"
                          onClick={() => addWidget(stateWidgets[key], key)}
                        />
                      ) : (
                        <div
                          style={{
                            padding: 20,
                            color: '#fff',
                            fontWeight: 'bold',
                          }}
                        >
                          {'该小程序最多添加'}
                          {stateWidgets[key].maxLength}
                          {'个'}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="react-dashboard-widget-emptyContent"
                style={{ minHeight: height - 20 }}
              >
                <Empty description={<span>{'该条件下暂无小程序'}</span>} />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WidgetSelector;
