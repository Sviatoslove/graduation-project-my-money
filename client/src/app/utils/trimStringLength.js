export const trimStringLength = (str, length) => {
  if(str === 0 || str){
    const string = String(str)
    return string?.length > length
    ? string?.split('').splice(0, length).join('') + '...'
    : str
  }
}