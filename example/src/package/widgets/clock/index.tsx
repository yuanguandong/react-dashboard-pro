import { AiOutlineClockCircle } from 'react-icons/ai';
import Panel from './panel';
import snapShot from './snapshot.png';

export default {
  name: '时钟',
  description: '时钟',
  tags: ['时钟', '时钟'],
  component: Panel,
  configComponent: null,
  maxLength: 1,
  snapShot,
  icon: <AiOutlineClockCircle/>,
  iconBackground: 'linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%)',
  size: {
    defaultWidth: 4,
    defaultHeight: 5,
    maxWidth: 12,
    maxHeight: 16,
    minWidth: 2,
    minHeight: 4,
  },
}