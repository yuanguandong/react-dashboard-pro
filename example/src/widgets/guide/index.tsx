import { RightCircleOutlined } from '@ant-design/icons';
import Panel from './component';
import snapShot from './snapshot.png';

export default {
  name: 'Guide',
  description: 'Guide panel, navigation',
  tags: ['all','panel'],
  component: Panel,
  configComponent: null,
  maxLength: 2,
  snapShot,
  icon: <RightCircleOutlined />,
  iconBackground: 'linear-gradient(to right, #f52248 0%, #e4620c 100%)',
  size: {
    defaultWidth: 4,
    defaultHeight: 5,
    maxWidth: 12,
    maxHeight: 16,
    minWidth: 2,
    minHeight: 4,
  },
}