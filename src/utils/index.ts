/*
 * @Author: 卢天宇
 * @Date: 2023-10-18 18:58:38
 * @Description: 
 */
// * 工作的月数
// * 2023年10月18日 云从科技offer的薪资计算。
const monthArr = [12, 18, 24];

function getMoneyByMonth(month = 12) {

  return function getMoney(money = 0, probationPeriodMonth = 3) {
    const probationPeriod = probationPeriodMonth;
    switch (money) {
      case 14:
        return money * month;
      case 14.5:
        return money * 0.8 * probationPeriod + money * (month - probationPeriod);
      default:
        return 0;
    }
  }
}

monthArr.forEach((month) => {
  const getMoney = getMoneyByMonth(month);
  const full = getMoney(14);
  const notFull = getMoney(14.5);
  const diff = (notFull - full) / month;
  console.group(`当工作时间为${month}月时`);
  console.log(`月薪为14k的时候：${full}`);
  console.log(`月薪为14.5k的时候：${notFull}`);
  console.log(`相差：${diff < 0 ? `每月少赚 ${Math.abs(diff)} 万元` : `每月多赚 ${diff} 万元`}`);
  console.groupEnd();
})


/**
 * 字符串首字母转大写(hello world => Hello World)
 * @param str 字符串 例如 hello world
 * @returns 
 */
function strLowerCaseToUpperCase(str = '') {
  if (!str) return '';
  return str.split(' ').map(item => (`${item[0].toUpperCase()}${item.slice(1)}`)).join(' ');
}

export {
  strLowerCaseToUpperCase
}

// function containsRepeatingLetter(str: string): boolean {
//   const reg = /[a-zA-Z]/;
//   let tempStr = '';
//   let isStr;
//   for (let i = 0; i < str.length; i++) {
//     isStr = reg.test(str[i]);
//     if (isStr && tempStr.endsWith(str[i])) {
//       return true;
//     }
//     tempStr += str[i];
//   }
//   return false;
// }

// console.log('包含连续字符串吗？')
// console.log(containsRepeatingLetter('rattler'));

function containsRepeatingLetter2(str: string): boolean {
  const reg = /[a-zA-Z]/;
  for (let i = 0; i < str.length; i++) {
    if (reg.test(str.charAt(i)) && str.charAt(i) === str.charAt(i - 1)) {
      return true;
    }
  }
  return false;
}
console.log('包含连续字符串吗？')
console.log(containsRepeatingLetter2('rattler'));

// 完成一个函数，例如 arr = [1,2,3,4,5,6]， 调用 fn(arr, 2); 返回 [[1,2], [3,4], [5,6]]

function fn(arr: number[], limit = 1) {
  if (!Array.isArray(arr) || arr?.length == 0) return [];
  limit = limit > 0 ? limit : 1
  const result = [];
  for (let i = 0; i < arr.length; i += limit) {
    result.push(arr.slice(i, i + limit));
  }
  return result;
}

console.log(fn([1, 2, 3, 4, 5, 6, 7], 2))