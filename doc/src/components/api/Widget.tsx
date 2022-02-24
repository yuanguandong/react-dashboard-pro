import { Table } from 'antd';

export default (props:any)=>{
  
  const dataSource = [
    {
      prop: `name`,
      desc: `小程序名称`,
      type: `string`,
      default: ``,
      required: `true`
    },
    {
      prop: `description`,
      desc: `小程序描述`,
      type: `string`,
      default: ``,
      required: `true`
    },{
      prop: `tags`,
      desc: `标签，被用作小程序选择器分类依据`,
      type: `string[]`,
      default: ``,
      required: `true`
    },{
      prop: `component`,
      desc: `小程序组件`,
      type: `Component | FunctionComponent`,
      default: ``,
      required: `true`
    },{
      prop: `configComponent`,
      desc: `小程序对应的配置组件`,
      type: `Component | FunctionComponent | null`,
      default: ``,
      required: `true`
    },{
      prop: `maxLength`,
      desc: `该小程序在当前仪表板最大可添加数量`,
      type: `number`,
      default: ``,
      required: `true`
    },{
      prop: `snapShot`,
      desc: `小程序快照图片，用于小程序选择器显示`,
      type: `ImageBitmapSource`,
      default: ``,
      required: `true`
    },{
      prop: `icon`,
      desc: `小程序图标，用于小程序选择器显示`,
      type: `ReactElement`,
      default: ``,
      required: `true`
    },{
      prop: `iconBackground`,
      desc: `小程序图标背景，用于小程序选择器显示`,
      type: `string`,
      default: ``,
      required: `true`
    },{
      prop: `size`,
      desc: `小程序尺寸信息`,
      type: `{
        defaultWidth: number;
        defaultHeight: number;
        maxWidth: number;
        maxHeight: number;
        minWidth: number;
        minHeight: number;
      }`,
      default: ``,
      required: `true`
    }
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
  
  return <Table rowKey={'prop'} bordered dataSource={dataSource} columns={columns} pagination={false} style={{marginBottom:10}}/>
}