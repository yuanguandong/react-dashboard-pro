import { AiOutlineClockCircle } from 'react-icons/ai';
import Panel from './panel';
import snapShot from './snapshot.png';

export default {
  name: '引导',
  description: '强调某些关键词，引导用户点击',
  tags: ['系统工具'],
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