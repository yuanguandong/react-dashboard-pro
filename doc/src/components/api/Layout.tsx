import { Table } from 'antd';

export default (props:any)=>{
  
  const dataSource = [
    {
      prop: `i`,
      desc: `唯一标识, 以小程序的key-uuid组成,加中划线分割，如 'Todo-53084247679600442035440807237732',uuid不限制位数，只需确保当前仪表板中唯一即可`,
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