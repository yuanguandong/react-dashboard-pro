// import { updateApi as modifySmartChartConfig } from '@/pages/common/widgets/smartchart/service'
import _ from 'lodash';

export const request = async (url: string, options: any) => {
  const {
    method,
    data: { dataId, dataType, bigData },
  } = options;
  let res;

  switch (method) {
    case 'POST':
      localStorage.setItem(`${dataId}-${dataType}`, bigData);
      break;
    case 'GET':
      res = localStorage.getItem(`${dataId}-${dataType}`);
      break;
    case 'DELETE':
      localStorage.removeItem(`${dataId}-${dataType}`);
  }

  res = localStorage.getItem(`${dataId}-${dataType}`);

  return res;
};

/**
 *复制字符串到系统剪切板
 *
 * @param {*} str
 */
export const copy = (str: string) => {
  var save = function (e: any) {
    e.clipboardData.setData('text/plain', str);
    e.preventDefault(); //阻止默认行为
  };
  document.addEventListener('copy', save);
  document.execCommand('copy');
  setTimeout(() => {
    document.removeEventListener('copy', save);
  }, 1000);
};

export const formatLayout = (layout) => {
  const data = _.cloneDeep(layout);
  data.forEach((item) => {
    delete item.minW;
    delete item.maxW;
    delete item.minH;
    delete item.maxH;
    delete item.moved;
    delete item.static;
  });
  return data;
};

//添加最大最小值
export const calcMinAndMax = (data, widgets) => {
  data.map((item, index) => {
    const key = item.i.split('-')[0];
    if (!key) {
      return;
    }
    const { minW = 1, maxW = 12, minH = 1, maxH = 100 } = widgets[key];
    item.minW = minW;
    item.maxW = maxW;
    item.minH = minH;
    item.maxH = maxH;
  });
  return data;
};
