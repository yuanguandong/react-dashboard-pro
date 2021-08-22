/*
 * @Descripttion: 仪表板组件，属于框架业务型组件
                  主要用于widget按用户自定义布局的显示，还包含仪表板布局设计器、内嵌widget选择器
                  内部依赖用户个性化数据接口和公司个性化数据接口、内置数据读取和存储逻辑、内部做了数据管理，
                  主要布局技术是借助react-grid-layout实现的
 * @MainAuthor:   袁官东
 */
import {
  CheckOutlined,
  CloseOutlined,
  DashboardOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  RetweetOutlined
} from '@ant-design/icons';
import { Button, Empty, message, Spin, Tooltip } from 'antd';
import classnames from 'classnames';
import _ from 'lodash';
import React, {
  useCallback,
  useEffect, useMemo, useReducer,
  useState
} from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { confirmUtilAsync, generateUuid, reducer } from '../utils';
import Widget from '../widget';
import WidgetSelector from '../widget/selector';
import { getWidgetType } from '../widget/utils';
import { Toolbar } from './components';
import './index.less';
import {
  fetch as fetchApi,
  removeWidgetApi,
  update as updateApi
} from './service';

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
    dirtyCurrentLayout: [],
  });
  const { currentLayout, dirtyCurrentLayout } = state;

  //计算当前widget可添加length
  const calcLength = useCallback((widgets, layout) => {
    Object.keys(widgets).map((key) => {
      widgets[key].length = 0;
    });
    layout.map((item: any) => {
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
        let layout = _.isArray(initialLayout) ? initialLayout : [];
        if (response) {
          const resArr = JSON.parse(response).currentLayout;
          if (!_.isEmpty(resArr)) {
            layout = resArr;
          }
        }
        calcLength(widgets, layout);
        if (layout) {
          dispatch({
            type: 'save',
            payload: {
              currentLayout: layout,
              dirtyCurrentLayout: layout,
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
      const layout = payload['layout'];
      calcLength(widgets, layout);
      try {
        const response = await updateApi({
          id,
          data: {
            currentLayout: layout,
          },
        });
        if (!response) {
          return;
        }
        dispatch({
          type: 'save',
          payload: {
            currentLayout: layout,
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
      dispatch({
        type: 'save',
        payload: {
          dirtyCurrentLayout: layout,
        },
      });
      callback && callback()
    }, 300),
    [stateEditMode],
  );

  //添加小程序
  const addWidget = useCallback(
    (widget, type) => {
      if (dirtyCurrentLayout.length >= maxWidgetLength) {
        message.warning('超过了最大限制数量20' + ',' + '不能再添加了');
      }
      const lastItem = dirtyCurrentLayout[dirtyCurrentLayout.length - 1];
      const newLayout = [
        ...dirtyCurrentLayout,
        {
          w: widget.size.defaultWidth,
          h: widget.size.defaultHeight,
          x: 0,
          y: lastItem ? lastItem['y'] + lastItem['h'] : 0,
          i: type + '-' + generateUuid(),
          minW: widget.size.minWidth,
          maxW: widget.size.maxWidth,
          minH: widget.size.minHeight,
          maxH: widget.size.maxHeight,
        },
      ];
      onLayoutChange(newLayout);
      message.success('添加成功');
    },
    [dirtyCurrentLayout, onLayoutChange, maxWidgetLength],
  );

  //删除小程序
  const deleteWidget = useCallback(
    (widgetKey) => {
      dirtyCurrentLayout.map((item: any, index: number) => {
        if (item['i'] === widgetKey) {
          dirtyCurrentLayout.splice(index, 1);
        }
      });
      dispatch({
        type: 'save',
        payload: {
          dirtyCurrentLayout,
        },
      });
      // onLayoutChange(dirtyCurrentLayout, [], () => {
      //   removeWidget(widgetKey);
      // });
    },
    [dirtyCurrentLayout, onLayoutChange],
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

  useEffect(() => {
    exitEditCallback(stateEditMode);
  }, [stateEditMode]);

  const finLayout = useMemo(() => {
    return stateEditMode ? dirtyCurrentLayout : currentLayout;
  }, [stateEditMode,dirtyCurrentLayout,currentLayout]);

  console.log('dirtyCurrentLayout',dirtyCurrentLayout)
  console.log('currentLayout',currentLayout)
  console.log('finLayout',finLayout)

  return (
    <Spin
      spinning={loading}
      style={{
        width: '100%',
      }}
    >
      <div
        style={{
          width: '100%',
        }}
      >
        <ResponsiveReactGridLayout
          className="react-dashboard-layout"
          layouts={{ lg: finLayout }}
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
          {finLayout.map((item: any) => (
            <div
              key={item.i}
              className={classnames('react-dashboard-item')}
            >
              {widgets[getWidgetType(item.i, widgets)] ? (
                <Widget
                  // {...restProps}
                  widgetKey={item.i}
                  widgetType={getWidgetType(item.i, widgets)}
                  widgetHeight={item.h * 40 - 10}
                  editMode={stateEditMode}
                  onDeleteWidget={() => deleteWidget(item.i)}
                  widgets={widgets}
                />
              ) : (
                <div className="react-dashboard-aligncenter react-dashboard-full">
                  <div style={{ textAlign: 'center' }}>
                    <div>
                      {'数据有误'} {item.i}
                    </div>
                    {stateEditMode && (
                      <Button
                        icon={<DeleteOutlined />}
                        size="small"
                        style={{margin:'10px 0'}}
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

        {finLayout.length > 0 ? (
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
                {'编辑仪表板'}
              </Button>
            </div>
          )
        ) : (
          <>
            {!stateEditMode ? (
              <Spin spinning={loading}>
                <div className="react-dashboard-emptyContent" style={{ minHeight: 300 }}>
                  {!loading && (
                    <Empty description={<span>{'当前仪表板没有小程序'}</span>}>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => setStateEditMode(true)}
                      >
                        <DashboardOutlined />
                        {'编辑仪表板'}
                      </Button>
                    </Empty>
                  )}
                </div>
              </Spin>
            ) : (
              <div
                className={classnames('react-dashboard-full', 'react-dashboard-aligncenter')}
                style={{ minHeight: 300 }}
              >
                <WidgetSelector
                  widgets={widgets}
                  currentLayout={finLayout}
                  addWidget={addWidget}
                >
                  <>
                    <Tooltip title={'添加'}>
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

        {stateEditMode && (
          <Toolbar
            fixed={false}
            extraRight={
              <>
                <Button
                  size="small"
                  onClick={() => {
                    setStateEditMode(false);
                    dispatch({
                      type:'save',
                      payload:{
                        dirtyCurrentLayout: currentLayout,
                      }
                    })
                  }}
                  icon={<CloseOutlined />}
                >
                  {'取消'}
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    dispatch({
                      type:'save',
                      payload:{
                        dirtyCurrentLayout: currentLayout,
                      }
                    })
                  }}
                  icon={<RetweetOutlined />}
                >
                  {'恢复'}
                </Button>
                {!_.isEmpty(finLayout) && (
                  <Button
                    size="small"
                    danger
                    onClick={() => reset()}
                    icon={<DeleteOutlined />}
                  >
                    {'清空'}
                  </Button>
                )}
                <WidgetSelector
                  widgets={widgets}
                  currentLayout={finLayout}
                  addWidget={addWidget}
                />
                <Button
                  size="small"
                  onClick={() => {
                    update(
                      {
                        layout:dirtyCurrentLayout,
                      }
                    );
                    setStateEditMode(false);
                  }}
                  type="primary"
                  icon={<CheckOutlined />}
                >
                  {'保存'}
                </Button>
              </>
            }
          />
        )}
      </div>
    </Spin>
  );
};

export default Comp;
