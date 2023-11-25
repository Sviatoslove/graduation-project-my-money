import _ from 'lodash';

const getUniquenessEssence = (essenceArr, key) => {
  return _.uniqWith(essenceArr, (first, second) => {
    if (key) return first[key] === second[key];
    else return first === second;
  });
};

const getNum = (str, selector) => {
  if (selector === 'month') return String(str).split(' ')[1];
  if (selector === 'day') return String(str).split(' ')[2];
};

const getDaysOfWeek = (numWeek) => {
  if (numWeek) {
    const addZero = (num) => {
      return num < 10 ? '0' + num : num;
    };
    const arrWeek = numWeek.split('-');
    const year = arrWeek[0];
    const week = arrWeek[1].replace('W', '');
    const d = new Date('Jan 01, ' + year + ' 01:00:00');
    const w = d.getTime() + 604800000 * (week - 1);
    const n1 = new Date(w);
    const n2 = new Date(w + 518400000);
    return `С ${addZero(+getNum(n1, 'day') + 1)} по ${addZero(
      +getNum(n2, 'day') + 1
    )}`;
  }
};

const getMonthOfWeek = (numWeek) => {
  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };
  if (numWeek) {
    const arrWeek = numWeek.split('-');
    const year = arrWeek[0];
    const week = arrWeek[1].replace('W', '');
    const d = new Date('Jan 01, ' + year + ' 01:00:00');
    const w = d.getTime() + 604800000 * (week - 1);
    const n1 = new Date(w);
    return `${months[getNum(n1, 'month')]}`
  }
};

const getNameMonth = (num) => {
  const months = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ];
  return months[num - 1];
};

Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

export { getUniquenessEssence, getDaysOfWeek, getNameMonth, getMonthOfWeek };
