export default function getDate(date) {
  let res
  if(date) {
    res= date.split("T")[0].split('-')
    .reverse()
    .join('.')
  }else {
    const yourDate = new Date();
    res = yourDate.toISOString().split("T")[0].split('-')
    .reverse()
    .join('.')
  }
  return res;
}
