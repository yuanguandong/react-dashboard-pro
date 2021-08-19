import { Typography } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

export default () => {
  return (
    <div className="footer">
      <Typography>
        <Title>Smart Background</Title>
        <Paragraph>
          If you think it works, please give me a STAR
        </Paragraph>
        <Paragraph>
        Open-source MIT Licensed | Copyright © 2021-present
        </Paragraph>
        <Text code>@Yuanguandong</Text>
      </Typography>
    </div>
  );
};
