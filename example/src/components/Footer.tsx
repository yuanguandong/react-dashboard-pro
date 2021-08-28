import { GithubOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;

export default () => {
  return (
    <div className="footer">
      <Typography>
        <Title>React Dashboard Pro</Title>
        <Paragraph>
          If you think it works, please give me a STAR
        </Paragraph>
        <Paragraph>
        Open-source MIT Licensed | Copyright © 2021-present
        </Paragraph>
        <a href="https://github.com/yuanguandong" target="_blank"><Text code>@Yuanguandong</Text></a>
        <a href="https://github.com/yuanguandong/react-dashboard-pro" target="_blank"><Text code><GithubOutlined /> Github</Text></a>
      </Typography>
    </div>
  );
};
