import _ from "lodash";

export default function formatDataAvatars(n, data) {
  let arr;
  if (typeof data === "object") {
    arr = Object.values(data);
  } else arr = data;
  const url = arr[0]["url"];
  const newData =  arr[0]["keys"].reduce((acc, key) => {
    const urlKey = url.replace("key", key);
    const res = arr[0]["names"].map((name) => urlKey.replace("name", name));
    return (acc = [...acc, res]);
  }, []);
  const oneArray = _.concat(...newData)
  return _.chunk(oneArray, n)
}

export const getActiveElment = (value, rate) => {
  const btns = Array.from(document.querySelectorAll((`[data-type = ${rate}]`)));
  for (let i = 0; i < btns.length - 1; i++) {
    const el = btns[i];
    if (el.dataset.value === value) {
      return el;
    }
  }
};