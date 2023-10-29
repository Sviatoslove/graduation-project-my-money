import formatDataForIconsCategories from "./formatDataForIconsCategories";

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
  const oneArray = newData.reduce((acc, item)=>acc=[...acc, ...item], [])
  return formatDataForIconsCategories(n, oneArray)
}
