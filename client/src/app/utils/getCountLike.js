export default function getCountLike(data) {
  let arr;
  if (data && typeof data === "object") {
    arr = Object.values(data);
  } else arr = data;
  let count = 0;
  if (arr && arr.length) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].like) ++count;
    }
  }
  return count;
}
