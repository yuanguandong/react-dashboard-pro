import { Typography } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;

export default () => {
  return (
    <Typography style={{textAlign:'center',color:'#fff'}}>
      <Title style={{color:'#fff'}} level={1}>开箱即用的一站式仪表板解决方案</Title>
      <Title style={{color:'#fff'}}  level={4}>只需简单几步即可拥有动态仪表板功能</Title>
    </Typography>
  );
};
