import { Table } from 'antd';

export default (props:any)=>{
  
  const dataSource = [
    {
      prop: `symbols`,
      desc: `元素/字符/符号集合`,
      type: `(string | ReactNode | Element)[]`,
      default: `['●']`,
      required: `false`
    },
    {
      prop: `random`,
      desc: `符号是否随机生成位置和大小`,
      type: `{ fontSizeRange: number[] } | undefined`,
      default: ``,
      required: `false`
    },{
      prop: `underlayColor`,
      desc: `底衬颜色`,
      type: `string`,
      default: ``,
      required: `false`
    },{
      prop: `underlayImage`,
      desc: `底衬图片`,
      type: `string`,
      default: ``,
      required: `false`
    },{
      prop: `symbolsStyle`,
      desc: `符号样式`,
      type: `Object`,
      default: `{color: '#000',opacity: '0.3'}`,
      required: `false`
    },{
      prop: `rotate`,
      desc: `符号旋转角度`,
      type: `number`,
      default: `0`,
      required: `false`
    },{
      prop: `symbolSize`,
      desc: `符号大小`,
      type: `number`,
      default: `90`,
      required: `false`
    },{
      prop: `gap`,
      desc: `符号间距`,
      type: `number`,
      default: `10`,
      required: `false`
    },{
      prop: `animation`,
      desc: `滚动动画`,
      type: `{
        type: 'left' | 'right' | 'top' | 'bottom';
        speed: number;
      }`,
      default: ``,
      required: `false`
    },{
      prop: `childrenWrapClassName`,
      desc: `子组件容器类名`,
      type: `string`,
      default: ``,
      required: `false`
    },
    {
      prop: `childrenWrapStyle`,
      desc: `子组件容器类名`,
      type: `React.CSSProperties`,
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
  
  return <Table rowKey={'prop'} bordered dataSource={dataSource} columns={columns} pagination={false}/>
}