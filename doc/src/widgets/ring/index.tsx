import { IssuesCloseOutlined } from '@ant-design/icons';
import Panel from './component';
import snapShot from './snapshot.png';

export default {
  name: 'Ring',
  description: 'ring progress',
  tags: ['all','chart'],
  component: Panel,
  configComponent: null,
  maxLength: 2,
  snapShot,
  icon: <IssuesCloseOutlined />,
  iconBackground: 'orange',
  size: {
    defaultWidth: 2,
    defaultHeight: 5,
    maxWidth: 12,
    maxHeight: 16,
    minWidth: 2,
    minHeight: 4,
  },
}