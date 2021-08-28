import { Table } from 'antd';

export default (props: any) => {
  const dataSource = [
    {
      prop: `widgets`,
      desc: `可选的小程序对象集合`,
      type: (
        <>
          {`{
          [key: string]`}
          :<a href="#widget">widget</a>{`}`}
        </>
      ),
      default: ``,
      required: `true`,
    },
    {
      prop: `editMode`,
      desc: `是否编辑状态`,
      type: `boolean`,
      default: `false`,
      required: `false`,
    },
    {
      prop: `defaultLayout`,
      desc: `初始布局`,
      type: <><a href="#layout">LayoutItem</a>[]</>,
      default: `[]`,
      required: `false`,
    },
    {
      prop: `widgetWrapClassName`,
      desc: `widget容器类名`,
      type: `string`,
      default: ``,
      required: `false`,
    },
    {
      prop: `widgetWrapStyle`,
      desc: `widget容器样式`,
      type: `React.CSSProperties`,
      default: `{color: '#000',opacity: '0.3'}`,
      required: `false`,
    },
    {
      prop: `layout`,
      desc: `布局数据`,
      type: <><a href="#layout">LayoutItem</a>[]</>,
      default: `null`,
      required: `false`,
    },
    {
      prop: `minHeight`,
      desc: `最小高度`,
      type: `number`,
      default: `300`,
      required: `false`,
    },
    {
      prop: `maxWidgetLength`,
      desc: `当前仪表板最大可添加的widget数量`,
      type: `number`,
      default: `20`,
      required: `false`,
    },
    {
      prop: `toolbar`,
      desc: `是否显示默认工具栏`,
      type: `boolean`,
      default: `true`,
      required: `false`,
    },
    {
      prop: `storageKey`,
      desc: `本地存储唯一标识`,
      type: `string`,
      default: `default`,
      required: `false`,
    },
    {
      prop: `onLayoutChange`,
      desc: `布局改变的回调`,
      type: `(layout: LayoutsIF) => void`,
      default: ``,
      required: `false`,
    },
    ,
    {
      prop: `onReset`,
      desc: `清空按钮的回调`,
      type: `(dirtyCurrentLayout: LayoutsIF, currentLayout: LayoutItem) => void`,
      default: ``,
      required: `false`,
    },
    ,
    {
      prop: `onRemoveWidget`,
      desc: `删除小程序的回调`,
      type: `(
        widget: widgetIF,
        dirtyCurrentLayout: LayoutsIF,
        currentLayout: LayoutsIF,
      ) => void`,
      default: ``,
      required: `false`,
    },
    {
      prop: `onAddWidget`,
      desc: `添加小程序的回调`,
      type: `(
        widget: widgetIF,
        dirtyCurrentLayout: LayoutsIF,
        currentLayout: LayoutsIF,
      ) => void`,
      default: ``,
      required: `false`,
    },
    ,
    {
      prop: `onReload`,
      desc: `刷新按钮的回调`,
      type: `(currentLayout: LayoutsIF) => void;`,
      default: ``,
      required: `false`,
    },
    ,
    {
      prop: `onCancelEdit`,
      desc: `取消编辑的回调`,
      type: `(
        dirtyCurrentLayout: LayoutsIF,
        currentLayout: LayoutItem,
      ) => void`,
      default: ``,
      required: `false`,
    },
    ,
    {
      prop: `onEdit`,
      desc: `进入编辑的回调`,
      type: `(currentLayout: LayoutsIF) => void`,
      default: ``,
      required: `false`,
    },
    ,
    {
      prop: `onSave`,
      desc: `保存按钮的回调`,
      type: `(currentLayout: LayoutsIF) => void`,
      default: ``,
      required: `false`,
    },
    ,
    {
      prop: `onRevert`,
      desc: `恢复按钮的回调`,
      type: `(dirtyCurrentLayout: LayoutsIF, currentLayout: LayoutItem) => void`,
      default: ``,
      required: `false`,
    },
  ];

  const columns = [
    {
      title: '属性',
      dataIndex: 'prop',
      key: 'prop',
    },
    {
      title: '说明',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '默认值',
      dataIndex: 'default',
      key: 'default',
    },
    {
      title: '是否必传',
      dataIndex: 'required',
      key: 'required',
    },
  ];

  return (
    <Table
      rowKey={'prop'}
      bordered
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      style={{ marginBottom: 10 }}
    />
  );
};
