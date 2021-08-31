import { Table } from 'antd';

// dom: dom.current,
//     reset, //清空
//     removeWidget, //删除
//     addWidget, //新增
//     reload, // 刷新
//     cancelEdit, //取消编辑
//     edit, //编辑
//     revert, //重置
//     save,  //保存


export default (props:any)=>{
  
  const dataSource = [
    {
      prop: `dom`,
      desc: `DOM对象`,
      type: `HTMLDivElement`,
      default: ``,
      required: `false`
    }
    ,{
      prop: `addWidget`,
      desc: `添加小程序`,
      type: <>(<a href="#widget">widget</a>{`)=>void`}</>,
      default: ``,
      required: `false`
    },
    {
      prop: `removeWidget`,
      desc: `删除小程序`,
      type: <>(<a href="#layout">i:widgetKey</a>{`)=>void`}</>,
      default: ``,
      required: `false`
    },{
      prop: `reload`,
      desc: `刷新`,
      type: `()=>void`,
      default: ``,
      required: `false`
    },{
      prop: `edit`,
      desc: `进入编辑`,
      type: `()=>void`,
      default: ``,
      required: `false`
    },{
      prop: `cancelEdit`,
      desc: `取消编辑`,
      type: `()=>void`,
      default: ``,
      required: `false`
    },{
      prop: `reset`,
      desc: `清空布局`,
      type: `()=>void`,
      default: ``,
      required: `false`
    },{
      prop: `revert`,
      desc: `重置`,
      type: `()=>void`,
      default: ``,
      required: `false`
    },{
      prop: `save`,
      desc: `保存`,
      type: `()=>void`,
      default: ``,
      required: `false`
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
    // {
    //   title: '默认值',
    //   dataIndex: 'default',
    //   key: 'default',
    // },
    // {
    //   title: '是否必传',
    //   dataIndex: 'required',
    //   key: 'required',
    // },
  ];
  
  return <Table rowKey={'prop'} bordered dataSource={dataSource} columns={columns} pagination={false} style={{marginBottom:10}}/>
}