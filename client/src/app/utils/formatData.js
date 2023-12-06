import _ from 'lodash';
import { nanoid } from 'nanoid';

function formatDataAvatars(data) {
  let arr;
  if (typeof data === 'object') {
    arr = Object.values(data);
  } else arr = data;
  const url = arr[0]['url'];
  const newData = arr[0]['keys'].reduce((acc, key) => {
    const urlKey = url.replace('key', key);
    const res = arr[0]['names'].map((name) => urlKey.replace('name', name));
    return (acc = [...acc, res]);
  }, []);
  const oneArray = _.concat(...newData);
  const obj = oneArray.reduce((acc, el, idx) => {
    const id = nanoid();
    return (acc = {
      ...acc,
      [id]: {
        dataType: 'avatar',
        imgSrc: el,
        _id: id,
      },
    });
  }, {});
  return obj;
}

const getArray = (count, numDays, monthLength) => {
  let rate
  let z = 0
  return Array.from({ length: count }, (v, i) => {
    if(numDays) {
      if (monthLength && monthLength >= i + +numDays) {
        rate = numDays
        z=i
      }else {
        return i - z
      };
    }
    return i + (rate ? + rate : + 1);
  });
};

const formatDataForAvatarsFields = (count, data) => {
  if (data && Object.values(data).length) {
    const array = getArray(count);
    let newData =
      typeof data === 'object' ? Object.values({ ...data }) : [...data];
    const result = [];

    if (newData[0].like !== undefined) {
      const sortLikeData = newData.reduce((acc, el) => {
        if (el.like) acc.unshift(el);
        else acc = [...acc, el];
        return acc;
      }, []);
      newData = [...sortLikeData];
    }

    for (let i = 0; i < newData.length + 1; i++) {
      const element = array.reduce((acc) => {
        const newObj = { ...newData.splice(0, 1)[0], rate: i };
        if (!newObj._id) return acc;
        acc = [...acc, newObj];
        return acc;
      }, []);
      result.push(element);
    }
    return result;
  }
};

const getFindActiveIndex = (value, arr) => {
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      const el = arr[i];
      for (let i = 0; i < el.length; i++) {
        const obj = el[i];
        if ((obj.imgSrc || obj.icon) === value) return obj.rate;
      }
    }
  }
};

function formatDataCountsIcons(arr) {
  return arr.reduce((acc, item) => {
    const _id = nanoid();
    return (acc = {
      ...acc,
      [_id]: {
        _id: _id,
        imgSrc: `https://img.icons8.com/${item.name}`,
        dataType: 'icon',
      },
    });
  }, {});
}

export {
  formatDataAvatars,
  formatDataForAvatarsFields,
  getFindActiveIndex,
  formatDataCountsIcons,
  getArray,
};
