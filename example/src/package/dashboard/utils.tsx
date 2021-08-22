// import { updateApi as modifySmartChartConfig } from '@/pages/common/widgets/smartchart/service'




export const request = async (url:string, options:any) => {
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
