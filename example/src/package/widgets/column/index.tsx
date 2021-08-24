import { AiOutlineClockCircle } from 'react-icons/ai';
import Panel from './component';
import snapShot from './snapshot.png';

export default {
  name: 'Column',
  description: 'column chart',
  tags: ['all','chart'],
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