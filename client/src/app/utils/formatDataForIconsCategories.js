const formatDataForIconsCategories = (count, data) => {
  const array = Array.from({length: count}, (v, i) => i + 1)
  const newData = typeof data === 'object' ? Object.values({...data}) : [...data]
  const result = []
  for (let i = 0; i < newData.length; i++) {
    const element = array.reduce((acc)=> acc = [...acc, ...newData.splice(0,1)],[])
    result.push(element)
  }
  return result
}

export default formatDataForIconsCategories