import { nanoid } from 'nanoid'

export default function formatDataCountsIcons(arr) {
  return arr.reduce((acc, item) => {
    const _id = nanoid()
    return (acc = {...acc, [_id]: {
      _id:_id,
      icon: `https://img.icons8.com/${item.name}`
    }})
  }, {})
}