import { GithubOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import Config from '../config';
const { Title, Paragraph, Text, Link } = Typography;
export default () => {
  return (
    <div className="footer">
      <Typography>
        <Title>{Config.name}</Title>
        <Paragraph>If you think it works, please give me a STAR</Paragraph>
        <Paragraph>
          Open-source MIT Licensed | Copyright © 2021-present
        </Paragraph>
        <a href={Config.authorHomePage} target="_blank">
          <Text code>@Yuanguandong</Text>
        </a>
        <a href={Config.homePageUrl} target="_blank">
          <Text code>
            <GithubOutlined /> Github
          </Text>
        </a>
      </Typography>
    </div>
  );
};
