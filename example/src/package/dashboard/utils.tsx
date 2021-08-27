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


/**
 *复制字符串到系统剪切板
 *
 * @param {*} str
 */
 export const copy = (str: string) => {
  var save = function (e: any) {
    e.clipboardData.setData("text/plain", str); //下面会说到clipboardData对象
    e.preventDefault(); //阻止默认行为
  };
  document.addEventListener("copy", save);
  document.execCommand("copy"); //使文档处于可编辑状态，否则无效
};