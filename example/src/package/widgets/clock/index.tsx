import { ClockCircleOutlined } from '@ant-design/icons';
import Panel from './component';
import snapShot from './snapshot.png';

export default {
  name: 'Clock',
  description: 'a clock',
  tags: ['all','system'],
  component: Panel,
  configComponent: null,
  maxLength: 2,
  snapShot,
  icon: <ClockCircleOutlined />,
  iconBackground: 'blue',
  size: {
    defaultWidth: 4,
    defaultHeight: 5,
    maxWidth: 12,
    maxHeight: 16,
    minWidth: 2,
    minHeight: 4,
  },
}