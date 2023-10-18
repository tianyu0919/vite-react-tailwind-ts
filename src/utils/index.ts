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