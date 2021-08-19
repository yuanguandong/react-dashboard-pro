import { Typography } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;

export default () => {
  return (
    <Typography style={{textAlign:'center',color:'#fff'}}>
      <Title style={{color:'#fff'}} level={1}>An React Component Can Automatically Generate The Background </Title>
      <Title style={{color:'#fff'}}  level={4}>一个快速生成元素背景的react组件</Title>
    </Typography>
  );
};
