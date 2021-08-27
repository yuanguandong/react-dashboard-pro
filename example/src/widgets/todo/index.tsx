import { CalendarOutlined } from '@ant-design/icons';
import Panel from './component';
import snapShot from './snapshot.png';

export default {
  name: 'Todo',
  description: 'todo list',
  tags: ['all','list'],
  component: Panel,
  configComponent: null,
  maxLength: 2,
  snapShot,
  icon: <CalendarOutlined />,
  iconBackground: 'linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%)',
  size: {
    defaultWidth: 3,
    defaultHeight: 11,
    maxWidth: 12,
    maxHeight: 16,
    minWidth: 2,
    minHeight: 4,
  },
}