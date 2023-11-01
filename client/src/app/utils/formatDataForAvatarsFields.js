import _ from 'lodash';
import { nanoid } from 'nanoid';

export default function formatDataAvatars(data) {
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
  const obj = oneArray.reduce((acc, el) => {
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

export const formatDataForAvatarsFields = (count, data) => {
  const array = Array.from({length: count}, (v, i) => i + 1)
  const newData = typeof data === 'object' ? Object.values({...data}) : [...data]
  const result = []
  for (let i = 0; i < newData.length; i++) {
    const element = array.reduce((acc)=> acc = [...acc, ...newData.splice(0,1)],[])
    result.push(element)
  }
  return result
}


