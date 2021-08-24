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
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef,
  useState
} from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { ReactJSXElement } from '_@emotion_react@11.4.1@@emotion/react/types/jsx-namespace';
import { generateUuid, reducer } from '../utils';
import Widget from '../widget';
import WidgetSelector from '../widget/selector';
import { getWidgetType } from '../widget/utils';
import { Toolbar } from './components';
import './index.less';
import { fetch as fetchApi, update as updateApi } from './service';

const ResponsiveReactGridLayout: any = WidthProvider(Responsive);
export const maxWidgetLength = 20;

export type LayoutItem = {
  w: number; //宽度份数，总共12份
  h: number; //高度份数，1份大概30px
  x: number; //横向位置，总共12份
  y: number; //纵向位置，1份大概30px
  i: string; //唯一标识
  minW: number; //最小宽度
  maxW: number; //最大宽度
  minH: number; //最小高度
  maxH: number; //最大高度
};
export type LayoutsIf = LayoutItem[];
export interface widgetIF {
  name: string;
  description: string;
  tags: string[];
  component: ReactJSXElement;
  configComponent: ReactJSXElement;
  maxLength: number;
  snapShot: ImageBitmapSource;
  icon: ReactJSXElement;
  iconBackground: string;
  size: {
    defaultWidth: number;
    defaultHeight: number;
    maxWidth: number;
    maxHeight: number;
    minWidth: number;
    minHeight: number;
  };
  [key: string]: any;
}
interface widgetsIF {
  [key: string]: widgetIF;
}
export interface Dashboard {
  id: string; //唯一标识
  widgets: widgetsIF; //widget库
  editMode?: boolean; //是否编辑状态
  exitEditCallback?: Function; //退出编辑时回调
  initialLayout?: LayoutItem[]; //初始布局
  widgetWrapClassName?: string; //widget容器类名
  widgetWrapStyle?: React.CSSProperties; //widget容器样式
  currentLayout?:LayoutItem[]; //初始布局
  onLayoutChange: (layout: LayoutItem[]) => void;
  onReset: (
    dirtyCurrentLayout: LayoutItem[],
    currentLayout: LayoutItem,
  ) => void; //清空
  onRemoveWidget: (
    widget: widgetIF,
    dirtyCurrentLayout: LayoutItem[],
    currentLayout: LayoutItem[],
  ) => void; //删除
  onAddWidget: (
    widget: widgetIF,
    dirtyCurrentLayout: LayoutItem[],
    currentLayout: LayoutItem[],
  ) => void; //新增
  onReload: (currentLayout: LayoutItem[]) => void; // 刷新
  onCancelEdit: (
    dirtyCurrentLayout: LayoutItem[],
    currentLayout: LayoutItem,
  ) => void; //取消编辑
  onEdit: (currentLayout: LayoutItem[]) => void; //编辑
  onSave: (currentLayout: LayoutItem[]) => void; //编辑
  onRevert: (
    dirtyCurrentLayout: LayoutItem[],
    currentLayout: LayoutItem,
  ) => void; //重置
  [key: string]: any;
}

const Dashboard = forwardRef((props: Dashboard, ref: any) => {
  const {
    id,
    editMode = false,
    widgets,
    exitEditCallback = () => {},
    initialLayout = [],
    widgetWrapClassName,
    widgetWrapStyle,
    currentLayout:_currentLayout=[],
    onLayoutChange: _onLayoutChange,
    onReset, //清空
    onRemoveWidget, //删除
    onAddWidget, //新增
    onCancelEdit, //取消编辑
    onEdit, //编辑
    onRevert, //重置
    onSave, //保存
    ...restProps
  } = props;

  const [stateEditMode, setStateEditMode] = useState(editMode);
  const [loading, setLoading] = useState(editMode);

  const [state, dispatch] = useReducer(reducer, {
    currentLayout: [],
    dirtyCurrentLayout: [],
  });
  const { currentLayout, dirtyCurrentLayout } = state;

  const dom = useRef<any>(null);

  //计算当前widget可添加length
  const calcLength = useCallback((widgets: widgetsIF, layout) => {
    Object.keys(widgets).map((key: string) => {
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
    _.debounce(async () => {
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
    async () => {
      setLoading(true);
      fetch();
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
  // const removeWidget = useCallback(async (widgetKey) => {
  //   try {
  //     await removeWidgetApi({
  //       widgetKey,
  //     });
  //   } catch (error) {}
  // }, []);

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
      _onLayoutChange && _onLayoutChange(layout);
      callback && callback();
    }, 300),
    [stateEditMode],
  );

  //添加小程序
  const addWidget = useCallback(
    (widget: widgetIF) => {
      if (dirtyCurrentLayout.length >= maxWidgetLength) {
        message.warning(
          `超过了最大限制数量${maxWidgetLength}` + ',' + '不能再添加了',
        );
      }
      const lastItem = dirtyCurrentLayout[dirtyCurrentLayout.length - 1];
      const newLayout = [
        ...dirtyCurrentLayout,
        {
          w: widget.size.defaultWidth,
          h: widget.size.defaultHeight,
          x: 0,
          y: lastItem ? lastItem['y'] + lastItem['h'] : 0,
          i: widget.name + '-' + generateUuid(),
          minW: widget.size.minWidth,
          maxW: widget.size.maxWidth,
          minH: widget.size.minHeight,
          maxH: widget.size.maxHeight,
        },
      ];
      onAddWidget && onAddWidget(widget, dirtyCurrentLayout, newLayout);
      onLayoutChange(newLayout);
      message.success('添加成功');
    },
    [dirtyCurrentLayout, onLayoutChange, maxWidgetLength],
  );

  //删除小程序
  const removeWidget = useCallback(
    (widgetKey: string) => {
      let removedWidget: any;
      let newLayout = _.cloneDeep(dirtyCurrentLayout);
      newLayout.map((item: widgetIF, index: number) => {
        if (item['i'] === widgetKey) {
          removedWidget = item;
          newLayout.splice(index, 1);
        }
      });
      onRemoveWidget &&
        onRemoveWidget(removedWidget, dirtyCurrentLayout, newLayout);
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
    onReset && onReset([], currentLayout);
    onLayoutChange([]);
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

  useEffect(() => {
    dispatch({
      type: 'save',
      payload: {
        currentLayout,
        dirtyCurrentLayout: currentLayout,
      },
    });
  },[_currentLayout])

  const finLayout = useMemo(() => {
    return stateEditMode ? dirtyCurrentLayout : currentLayout;
  }, [stateEditMode, dirtyCurrentLayout, currentLayout]);

  //取消编辑
  const cancelEdit = () => {
    setStateEditMode(false);
    onCancelEdit && onCancelEdit(dirtyCurrentLayout, currentLayout);
    dispatch({
      type: 'save',
      payload: {
        dirtyCurrentLayout: currentLayout,
      },
    });
  };

  const revert = () => {
    onRevert && onRevert(dirtyCurrentLayout, currentLayout);
    dispatch({
      type: 'save',
      payload: {
        dirtyCurrentLayout: currentLayout,
      },
    });
  };
  const edit = () => setStateEditMode(true);

  const save =() => {
    onSave && onSave(dirtyCurrentLayout)
    update({
      layout: dirtyCurrentLayout,
    });
    setStateEditMode(false);
  }

  useImperativeHandle(ref, () => ({
    dom: dom.current,
    reset, //清空
    removeWidget, //删除
    addWidget, //新增
    reload, // 刷新
    cancelEdit, //取消编辑
    edit, //编辑
    revert, //重置
    save,
  }));

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
        ref={dom}
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
            <div key={item.i} className={classnames('react-dashboard-item')}>
              {widgets[getWidgetType(item.i, widgets)] ? (
                <Widget
                  {...restProps}
                  widgetKey={item.i}
                  widgetType={getWidgetType(item.i, widgets)}
                  height={item.h * 40 - 10}
                  editMode={stateEditMode}
                  onDeleteWidget={() => removeWidget(item.i)}
                  widgets={widgets}
                  widgetWrapClassName={widgetWrapClassName}
                  widgetWrapStyle={widgetWrapStyle}
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
                        style={{ margin: '10px 0' }}
                        onClick={() => removeWidget(item.i)}
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
                onClick={edit}
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
                <div
                  className="react-dashboard-emptyContent"
                  style={{ minHeight: 300 }}
                >
                  {!loading && (
                    <Empty description={<span>{'当前仪表板没有小程序'}</span>}>
                      <Button size="small" type="primary" onClick={edit}>
                        <DashboardOutlined />
                        {'编辑仪表板'}
                      </Button>
                    </Empty>
                  )}
                </div>
              </Spin>
            ) : (
              <div
                className={classnames(
                  'react-dashboard-full',
                  'react-dashboard-aligncenter',
                )}
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
                  onClick={cancelEdit}
                  icon={<CloseOutlined />}
                >
                  {'取消'}
                </Button>
                <Button
                  size="small"
                  onClick={revert}
                  icon={<RetweetOutlined />}
                >
                  {'恢复'}
                </Button>
                {!_.isEmpty(finLayout) && (
                  <Button
                    size="small"
                    danger
                    onClick={reset}
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
                  onClick={save}
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
});

export default Dashboard;
