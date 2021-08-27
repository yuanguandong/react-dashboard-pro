import { BarChartOutlined } from '@ant-design/icons';
import Panel from './component';
import snapShot from './snapshot.png';

export default {
  name: 'Column',
  description: 'column chart',
  tags: ['all','chart'],
  component: Panel,
  configComponent: null,
  maxLength: 2,
  snapShot,
  icon: <BarChartOutlined />,
  iconBackground: '#f00',
  size: {
    defaultWidth: 6,
    defaultHeight: 11,
    maxWidth: 12,
    maxHeight: 16,
    minWidth: 2,
    minHeight: 4,
  },
}