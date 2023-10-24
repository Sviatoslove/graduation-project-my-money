export default function getCountLike(arr) {
  let count = 0
  if (arr && arr.length) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].like) ++count
    }
  }
  return count
}
