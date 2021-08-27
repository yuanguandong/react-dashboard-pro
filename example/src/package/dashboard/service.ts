import { request } from './utils';

interface payloadProps {
  id: string;
  data?: object;
}

// 获取仪表板信息
export async function fetch(payload: payloadProps) {
  const { id } = payload;
  let url = '/accountUserSelf/getUserData';
  if (!id) {
    return;
  }
  return request(url, {
    method: 'GET',
    data: {
      dataId: id,
      dataType: 'dashboard',
    },
  });
}

// 修改仪表板信息
export async function update(payload: payloadProps) {
  const { id, data } = payload;
  let url = '/accountUserSelf/setUserData';
  if (!id) {
    return;
  }
  return request(url, {
    method: 'POST',
    data: {
      dataId: id,
      dataType: 'dashboard',
      bigData: JSON.stringify(data),
    },
  });
}

//删除小程序信息
export function removeWidgetApi(params: any) {
  const { widgetKey } = params;
  let url = '/accountUserSelf/delUserData';
  return request(url, {
    method: 'DELETE',
    data: {
      dataId: widgetKey,
      dataType: 'widget',
    },
  });
}
