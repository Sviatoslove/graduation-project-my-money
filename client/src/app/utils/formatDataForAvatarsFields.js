export default function formatDataAvatars(data) {
  let arr;
  if (typeof data === "object") {
    arr = Object.values(data);
  } else arr = data;
  const url = arr[0]["url"];
  return arr[0]["keys"].reduce((acc, key) => {
    const urlKey = url.replace("key", key);
    const res = arr[0]["names"].map((name) => urlKey.replace("name", name));
    return (acc = [...acc, res]);
  }, []);
}
