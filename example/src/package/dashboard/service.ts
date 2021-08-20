
import request from '@/utils/request';


interface payloadProps {
  id: string;
  type: string;
  data?: object;
}

// 获取仪表板信息
export async function fetch(payload: payloadProps) {
  const { id, type } = payload
  let url = '/accountUserSelf/getUserData';
  if (type == 'company') {
    url = '/companyData/getCompanyData'
  }
  if (!id) { return }
  return request(url, {
    method: 'POST',
    data: {
      dataId: id,
      dataType: "dashboard",
    },
    serviceId:'fwSecurity' 
  });
}


// 修改仪表板信息
export async function update(payload: payloadProps) {
  const { id, type, data } = payload
  let url = '/accountUserSelf/setUserData';
  if (type == 'company') {
    url = '/companyData/setCompanyData'
  }
  if (!id) { return }
  return request(url, {
    method: 'POST',
    data: {
      dataId: id,
      dataType: "dashboard",
      bigData: JSON.stringify(data)
    },
    serviceId:'fwSecurity' 
  });
}

// 删除仪表板信息
// export async function remove(payload: payloadProps) {
//   const { id, type } = payload
//   let url = '/accountUserSelf/delUserData';
//   if (type == 'company') {
//     url = '/companyData/delCompanyData'
//   }
//   if (!id) { return }
//   return request(url, {
//     method: 'POST',
//     data: {
//       dataId: id,
//       dataType: "dashboard"
//     },
//   });
// }

//删除小程序信息
export function removeWidgetApi(params) {
  const { widgetKey, type } = params
  let url = '/accountUserSelf/delUserData';
  if (type == 'company') {
    url = '/companyData/delCompanyData'
  }
  return request(url, {
    method: 'POST',
    data: {
      dataId: widgetKey,
      dataType: "widget",
    },
    serviceId:'fwSecurity' 
  });
}