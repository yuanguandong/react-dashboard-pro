/*
 * @Descripttion: 仪表板组件，属于框架业务型组件
                  主要用于widget按用户自定义布局的显示，还包含仪表板布局设计器、内嵌widget选择器
                  内部依赖用户个性化数据接口和公司个性化数据接口、内置数据读取和存储逻辑、内部做了数据管理，
                  主要布局技术是借助react-grid-layout实现的
 * @MainAuthor:   袁官东
 */
import {
  CheckOutlined,
  DashboardOutlined,
  DeleteOutlined,
  InfoOutlined,
  PlusOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { Button, Empty, message, Spin, Tooltip } from 'antd';
import classnames from 'classnames';
import _ from 'lodash';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { confirmUtilAsync, generateUuid, reducer } from '../utils';
import Widget from '../widget';
import WidgetSelector from '../widget/selector';
import { getWidgetType } from '../widget/utils';
import { Toolbar } from './components';
import styles from './index.less';
import {
  fetch as fetchApi,
  removeWidgetApi,
  update as updateApi
} from './service';
import './styles.less';

const ResponsiveReactGridLayout: any = WidthProvider(Responsive);
const maxWidgetLength = 20;

type LayoutItem = {
  w: number; //宽度
  h: number; //高度
  x: number; //横向位置，总共12份
  y: number; //纵向位置，1份大概30px
  i: string; //唯一标识
  minW: number; //最小宽度
  maxW: number; //最大宽度
  minH: number; //最小高度
  maxH: number; //最大高度
  moved: boolean;
  static: boolean;
};

interface Dashboard {
  id: string; //唯一标识
  widgets: any; //widget库
  editMode?: boolean; //是否编辑状态
  exitEditCallback?: Function; //退出编辑时回调
  initialLayout?: LayoutItem[]; //初始布局
  [key: string]: any;
}

const Comp = (props: Dashboard) => {
  const {
    id,
    editMode = false,
    widgets,
    exitEditCallback = () => {},
    initialLayout = [],
    ...restProps
  } = props;

  const [stateEditMode, setStateEditMode] = useState(editMode);
  const [loading, setLoading] = useState(editMode);

  const [state, dispatch] = useReducer(reducer, {
    currentLayout: [],
  });
  console.log('state',state)
  const { currentLayout } = state;

  //计算当前widget可添加length
  const calcLength = useCallback((widgets, currentLayout) => {
    Object.keys(widgets).map((key) => {
      widgets[key].length = 0;
    });
    currentLayout.map((item: any) => {
      Object.keys(widgets).map((key) => {
        if (item['i'].indexOf(key) >= 0) {
          widgets[key].length = widgets[key].length + 1;
        }
      });
    });
  }, []);

  //获取操作
  const fetch = useCallback(
    _.debounce(async (payload: object, callback?: Function) => {
      try {
        const response = await fetchApi({ id });
        let currentLayout = _.isArray(initialLayout) ? initialLayout : [];
        if (response) {
          const resArr = JSON.parse(response).currentLayout;
          if (!_.isEmpty(resArr)) {
            currentLayout = resArr;
          }
        }
        calcLength(widgets, currentLayout);
        console.log('fetch', currentLayout);
        if (currentLayout) {
          dispatch({
            type: 'save',
            payload: {
              currentLayout,
            },
          });
        }
        setLoading(false);
      } catch (error) {}
    }, 200),
    [id, widgets],
  );

  //刷新
  const reload = useCallback(
    async (payload: object, callback?: Function) => {
      setLoading(true);
      fetch({ id });
    },
    [fetch],
  );

  //设置布局信息
  const update = useCallback(
    async (payload: any, callback: Function = () => {}) => {
      const currentLayout = payload['currentLayout'];
      calcLength(widgets, currentLayout);
      try {
        const response = await updateApi({
          id,
          data: {
            currentLayout: currentLayout,
          },
        });
        if (!response) {
          return;
        }
        dispatch({
          type: 'save',
          payload: {
            currentLayout,
            widgets,
          },
        });
        callback();
      } catch (error) {}
    },
    [id, widgets],
  );

  //删除widget信息
  const removeWidget = useCallback(async (widgetKey) => {
    try {
      await removeWidgetApi({
        widgetKey,
      });
    } catch (error) {}
  }, []);

  //改变布局触发
  const onLayoutChange = useCallback(
    _.debounce((layout: any, layouts?: any, callback?: Function) => {
      window.dispatchEvent(new Event('resize'));
      if (!stateEditMode) {
        return;
      }
      console.log('layout',layout)
      update(
        {
          currentLayout: layout,
        },
        callback,
      );
    }, 300),
    [currentLayout, stateEditMode, update],
  );

  //添加小程序
  const addWidget = useCallback(
    (widget, type) => {
      if (currentLayout.length >= maxWidgetLength) {
        message.warning('超过了最大限制数量20' + ',' + '不能再添加了');
      }
      const lastItem = currentLayout[currentLayout.length - 1];
      const newLayout = [
        ...currentLayout,
        {
          w: widget.rect.defaultWidth,
          h: widget.rect.defaultHeight,
          x: 0,
          y: lastItem ? lastItem['y'] + lastItem['h'] : 0,
          i: type + '-' + generateUuid(),
          minW: widget.rect.minWidth,
          maxW: widget.rect.maxWidth,
          minH: widget.rect.minHeight,
          maxH: widget.rect.maxHeight,
        },
      ];
      onLayoutChange(newLayout);
      message.success('添加成功');
    },
    [currentLayout, onLayoutChange, maxWidgetLength],
  );

  //删除小程序
  const deleteWidget = useCallback(
    (widgetKey) => {
      
      currentLayout.map((item: any, index: number) => {
        if (item['i'] === widgetKey) {
          currentLayout.splice(index, 1);
        }
      });
      onLayoutChange(currentLayout, [], () => {
        removeWidget(widgetKey);
      });
    },
    [currentLayout, onLayoutChange],
  );

  //重置
  const reset = useCallback(async () => {
    const res: boolean = await confirmUtilAsync({
      content: '确定清空当前仪表板吗' + '?' + '清空操作不可恢复',
    });
    if (res) {
      onLayoutChange([]);
    }
  }, [onLayoutChange]);

  //id改变副作用
  useEffect(() => {
    fetch({
      id,
    });
  }, [id]);

  //编辑状态改变副作用
  useEffect(() => {
    setStateEditMode(editMode);
  }, [editMode]);
  console.log('render', currentLayout);
  return (
    <Spin spinning={loading}>
      <div
        style={{
          width: 'calc(100% + 0px)',
          // marginLeft: '-5px',
          // marginTop: '-5px',
        }}
      >
        <ResponsiveReactGridLayout
          className="layout"
          layouts={{ lg: currentLayout }}
          rowHeight={30}
          isDraggable={stateEditMode}
          breakpoints={{ lg: 1200, md: 800, sm: 600, xs: 400, xxs: 300 }}
          cols={{ lg: 12, md: 12, sm: 2, xs: 2, xxs: 2 }}
          // onBreakpointChange={onBreakpointChange} //断点回调
          onLayoutChange={onLayoutChange} //布局改变回调
          isResizable={stateEditMode} //准许改变大小
          // onWidthChange={()=>onWidthChange()}  //宽度改变回调
          measureBeforeMount //动画相关
        >
          {currentLayout.map((item: any) => (
            <div
              key={item.i}
              className={classnames('ant-card', 'reactgriditem')}
            >
              {widgets[getWidgetType(item.i, widgets)] ? (
                <Widget
                  // {...restProps}
                  widgetKey={item.i}
                  widgetType={getWidgetType(item.i, widgets)}
                  itemHeight={item.h * 40 - 10}
                  editMode={stateEditMode}
                  handleDeleteWidget={() => deleteWidget(item.i)}
                  widgets={widgets}
                />
              ) : (
                <div className="aligncenter full">
                  <div style={{ textAlign: 'center' }}>
                    <div>
                      {'数据有误'} {item.i}
                    </div>
                    {stateEditMode && (
                      <Button
                        icon={<DeleteOutlined />}
                        size="small"
                        className="gant-margin-v-10"
                        onClick={() => deleteWidget(item.i)}
                      >
                        {'删除'}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </ResponsiveReactGridLayout>

        {currentLayout.length > 0 ? (
          !stateEditMode && (
            <div
              style={{
                display: 'flex',
                margin: '0 10px',
                marginBottom: '10px',
              }}
            >
              <Button
                size="small"
                icon={<ReloadOutlined />}
                loading={loading}
                style={{ marginRight: '10px' }}
                onClick={() => reload({ id })}
              />
              <Button
                size="small"
                type="default"
                style={{ flex: 1 }}
                onClick={() => setStateEditMode(true)}
              >
                <DashboardOutlined />
                {'设计仪表板'}
              </Button>
            </div>
          )
        ) : (
          <>
            {!stateEditMode ? (
              <Spin spinning={loading}>
                <div
                  className="emptyContent"
                  // style={{ height: 'calc(100vh - 92px)' }}
                >
                  {!loading && (
                    <Empty description={<span>{'当前仪表板没有小程序'}</span>}>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => setStateEditMode(true)}
                      >
                        <DashboardOutlined />
                        {'设计仪表板'}
                      </Button>
                    </Empty>
                  )}
                </div>
              </Spin>
            ) : (
              <div
                className={classnames('full', 'aligncenter')}
                // style={{ height: 'calc(100vh - 92px)' }}
              >
                <WidgetSelector
                  widgets={widgets}
                  currentLayout={currentLayout}
                  addWidget={addWidget}
                >
                  <>
                    <Tooltip title={'添加小程序'}>
                      <Button
                        type="dashed"
                        shape="circle"
                        icon={<PlusOutlined />}
                        size="large"
                      />
                    </Tooltip>
                  </>
                </WidgetSelector>
              </div>
            )}
          </>
        )}
        {stateEditMode && !_.isEmpty(currentLayout) && (
          <div className={styles.block} />
        )}
        {stateEditMode && (
          <Toolbar
            fixed={false}
            extraRight={
              <>
                <Tooltip
                  placement="top"
                  title={
                    '在布局时请尽量不要改变浏览器大小' +
                    ',' +
                    '布局宽度可以随浏览器变小' +
                    ',' +
                    '但不会随浏览器宽度变大' +
                    '!'
                  }
                >
                  <InfoOutlined className="marginh10" />
                </Tooltip>
                <Button
                  size="small"
                  onClick={() => {
                    setStateEditMode(false);
                    exitEditCallback();
                  }}
                  icon={<CheckOutlined />}
                >
                  {'完成'}
                </Button>
                {!_.isEmpty(currentLayout) && (
                  <Button
                    size="small"
                    danger
                    onClick={() => reset()}
                    icon={<DeleteOutlined />}
                  >
                    {'一键清空'}
                  </Button>
                )}
                <WidgetSelector
                  widgets={widgets}
                  currentLayout={currentLayout}
                  addWidget={addWidget}
                />
              </>
            }
          />
        )}
      </div>
    </Spin>
  );
};

export default Comp;
