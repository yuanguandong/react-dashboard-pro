import { FaShareAltSquare } from 'react-icons/fa';
import Clock from './clock';
export default {
  Clock: {
    icon: <FaShareAltSquare/>,
    name: '时钟',
    description: '时钟',
    configPanel: false,
    maxLength: 1,
    component: Clock,
    snapShot: Clock['snapShot'],
    tags: ['时钟', '时钟'],
    iconBackground: 'linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%)',
    rect: {
      defaultWidth: 4,
      defaultHeight: 5,
      maxWidth: 12,
      maxHeight: 16,
      minWidth: 2,
      minHeight: 4,
    },
  },
};
