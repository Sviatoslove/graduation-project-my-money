export default function formatDataCountsIcons(arr) {
  return arr.reduce((acc, item)=>{
    return acc=[...acc, `https://img.icons8.com/${item.name}`]
  }, [])
} 