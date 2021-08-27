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
import KeyEvent from 'react-keyevent';
import { ReactJSXElement } from '_@emotion_react@11.4.1@@emotion/react/types/jsx-namespace';
import { generateUuid, reducer } from '../utils';
import Widget from '../widget';
import WidgetSelector from '../widget/selector';
import { getWidgetType } from '../widget/utils';
import { Toolbar } from './components';
import './index.less';
import { fetch as fetchApi, update as updateApi } from './service';
import './style/button.css';
import './style/empty.css';
import './style/input.css';
import './style/message.css';
import './style/modal.css';
import './style/spin.css';
import './style/tooltip.css';
import { copy, formatLayout } from './utils';

const ResponsiveReactGridLayout: any = WidthProvider(Responsive);

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
export type LayoutsIF = LayoutItem[];
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
  storageKey: string; //本地存储唯一标识
  widgets: widgetsIF; //widget库
  editMode?: boolean; //是否编辑状态
  initialLayout?: LayoutsIF; //初始布局
  widgetWrapClassName?: string; //widget容器类名
  widgetWrapStyle?: React.CSSProperties; //widget容器样式
  layout?: LayoutsIF; //布局数据
  minHeight?: number; //最小高度
  maxWidgetLength?: number; //当前仪表板最大可添加的widget数量
  toolbar?: boolean; //是否显示默认工具栏
  onLayoutChange: (layout: LayoutsIF) => void;
  onReset: (
    dirtyCurrentLayout: LayoutsIF,
    currentLayout: LayoutItem,
  ) => void; //清空
  onRemoveWidget: (
    widget: widgetIF,
    dirtyCurrentLayout: LayoutsIF,
    currentLayout: LayoutsIF,
  ) => void; //删除
  onAddWidget: (
    widget: widgetIF,
    dirtyCurrentLayout: LayoutsIF,
    currentLayout: LayoutsIF,
  ) => void; //新增
  onReload: (currentLayout: LayoutsIF) => void; // 刷新
  onCancelEdit: (
    dirtyCurrentLayout: LayoutsIF,
    currentLayout: LayoutItem,
  ) => void; //取消编辑
  onEdit: (currentLayout: LayoutsIF) => void; //编辑
  onSave: (currentLayout: LayoutsIF) => void; //编辑
  onRevert: (
    dirtyCurrentLayout: LayoutsIF,
    currentLayout: LayoutItem,
  ) => void; //重置
  [key: string]: any;
}

const Dashboard = forwardRef((props: Dashboard, ref: any) => {
  const {
    storageKey = 'default',
    editMode = false,
    widgets,
    initialLayout = [],
    widgetWrapClassName,
    widgetWrapStyle,
    layout: customLayout = null,
    minHeight = 300,
    maxWidgetLength = 20,
    toolbar = true,
    onLayoutChange: _onLayoutChange,
    onReset, //清空
    onReload, //刷新
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
    currentLayout: customLayout,
    dirtyCurrentLayout: customLayout,
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
        const response = await fetchApi({ id: storageKey });
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
    [storageKey, widgets],
  );

  //刷新
  const reload = useCallback(async () => {
    setLoading(true);
    onReload && onReload(formatLayout(currentLayout));
    if (!customLayout) {
      return;
    }
    fetch();
  }, [fetch, customLayout]);

  //设置布局信息
  const update = useCallback(
    async (payload: any, callback: Function = () => {}) => {
      const layout = payload['layout'];

      try {
        const response = await updateApi({
          id: storageKey,
          data: {
            currentLayout: layout,
          },
        });
        if (!response) {
          return;
        }

        callback();
      } catch (error) {}
    },
    [storageKey, widgets],
  );

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
      _onLayoutChange && _onLayoutChange(formatLayout(layout));
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
      onAddWidget &&
        onAddWidget(
          widget,
          formatLayout(dirtyCurrentLayout),
          formatLayout(newLayout),
        );
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
        onRemoveWidget(
          removedWidget,
          formatLayout(dirtyCurrentLayout),
          formatLayout(newLayout),
        );
      dispatch({
        type: 'save',
        payload: {
          dirtyCurrentLayout: newLayout,
        },
      });
    },
    [dirtyCurrentLayout, onLayoutChange],
  );

  //重置
  const reset = useCallback(async () => {
    onReset && onReset([], formatLayout(currentLayout));
    onLayoutChange([]);
  }, [onLayoutChange]);

  //最终的布局数据
  const finLayout = useMemo(() => {
    return stateEditMode ? dirtyCurrentLayout : currentLayout;
  }, [stateEditMode, dirtyCurrentLayout, currentLayout]);

  //取消编辑
  const cancelEdit = useCallback(() => {
    setStateEditMode(false);
    onCancelEdit &&
      onCancelEdit(
        formatLayout(dirtyCurrentLayout),
        formatLayout(currentLayout),
      );
    dispatch({
      type: 'save',
      payload: {
        dirtyCurrentLayout: currentLayout,
      },
    });
  }, [dirtyCurrentLayout, currentLayout]);

  const revert = useCallback(() => {
    onRevert &&
      onRevert(formatLayout(dirtyCurrentLayout), formatLayout(currentLayout));
    dispatch({
      type: 'save',
      payload: {
        dirtyCurrentLayout: currentLayout,
      },
    });
  }, [dirtyCurrentLayout, currentLayout]);

  const edit = () => setStateEditMode(true);

  const save = useCallback(() => {
    calcLength(widgets, dirtyCurrentLayout);
    dispatch({
      type: 'save',
      payload: {
        currentLayout: dirtyCurrentLayout,
        widgets,
      },
    });
    onSave && onSave(formatLayout(dirtyCurrentLayout));
    setStateEditMode(false);
    if (customLayout) {
      return;
    }
    update({
      layout: dirtyCurrentLayout,
    });
  }, [dirtyCurrentLayout, update, customLayout]);

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

  //打印布局数据
  const onCtrlShiftC = useCallback(() => {
    const res = formatLayout(currentLayout);
    copy(JSON.stringify(res));
    message.success('已复制布局数据到剪切板');
    console.log('currentLayout', res);
  }, [currentLayout]);

  //默认存储
  useEffect(() => {
    if (customLayout) {
      return;
    }
    fetch();
  }, [customLayout]);

  //编辑状态改变副作用
  useEffect(() => {
    setStateEditMode(editMode);
  }, [editMode]);

  //响应外部数据
  useEffect(() => {
    console.log('customLayout', customLayout);
    customLayout.map((item, index) => {
      const key = item.i.split('-')[0];
      if (!key) {
        return;
      }
      const { minW = 1, maxW = 12, minH = 1, maxH = 100 } = widgets[key];
      item.minW = minW;
      item.maxW = maxW;
      item.minH = minH;
      item.maxH = maxH;
    });
    dispatch({
      type: 'save',
      payload: {
        customLayout: customLayout,
        dirtyCurrentLayout: customLayout,
      },
    });
  }, [customLayout, widgets]);

  return (
    <Spin
      spinning={loading}
      style={{
        width: '100%',
      }}
    >
      <KeyEvent
        style={{
          width: '100%',
        }}
        events={{
          onCtrlShiftC,
        }}
        needFocusing
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
              <div
                key={item.i}
                className={classnames(
                  'react-dashboard-item',
                  stateEditMode ? 'react-dashboard-item-edit' : '',
                )}
              >
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

          {toolbar && finLayout.length > 0 ? (
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
                  onClick={() => reload()}
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
                    style={{ minHeight }}
                  >
                    {!loading && (
                      <Empty
                        description={<span>{'当前仪表板没有小程序'}</span>}
                      >
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
                  style={{ minHeight }}
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

          {toolbar && stateEditMode && (
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
      </KeyEvent>
    </Spin>
  );
});

export default Dashboard;
