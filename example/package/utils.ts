export function randomNum(minNum: number, maxNum: number) {
  switch (arguments.length) {
    case 1:
      return Math.floor(Math.random() * minNum + 1);
      break;
    case 2:
      return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
      break;
    default:
      return 0;
      break;
  }
}

export const getPosition = (random:any, fontSize:number) => {
  if(!random){
    return {
      fontSize
    }
  }
  const {fontSizeRange} = random
  const [minNum, maxNum] = fontSizeRange;
  const fontSizeFin = randomNum(minNum, maxNum);
  const top = randomNum(0, 100) + '%';
  const left = randomNum(0, 100) + '%';
  return { fontSize:fontSizeFin, top, left };
};


/*
生成uuid
len:number  长度
radix:number  进制
*/
export function generateUuid(len: number = 32, radix: number = 10): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  let i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}