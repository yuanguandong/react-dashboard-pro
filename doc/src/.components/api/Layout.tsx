import { Table } from 'antd';

export default (props:any)=>{
  
  const dataSource = [
    {
      prop: `i`,
      desc: `唯一标识, 以小程序的唯一标识加中划线开头，如 'widgetKey-1234567'`,
      type: `string`,
      default: ``,
      required: `true`
    },{
      prop: `w`,
      desc: `宽度份数，总共12份`,
      type: `number`,
      default: ``,
      required: `true`
    },
    {
      prop: `h`,
      desc: `高度份数，1份大概30px`,
      type: `number`,
      default: ``,
      required: `true`
    },{
      prop: `x`,
      desc: `横向位置，总共12份`,
      type: `number`,
      default: ``,
      required: `true`
    },{
      prop: `y`,
      desc: `纵向位置，1份大概30px`,
      type: `number`,
      default: ``,
      required: `true`
    },{
      prop: `minW`,
      desc: `最小宽度`,
      type: `number`,
      default: ``,
      required: `true`
    },{
      prop: `maxW`,
      desc: `最大宽度`,
      type: `number`,
      default: ``,
      required: `true`
    },{
      prop: `minH`,
      desc: `最小高度`,
      type: `number`,
      default: ``,
      required: `true`
    },{
      prop: `maxH`,
      desc: `最大高度`,
      type: `number`,
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