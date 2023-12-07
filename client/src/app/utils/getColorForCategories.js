import colorsIconsForCategories from '../mock/colorIconsForCategories';

export default function randomNum(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

export const getColorsForCategories = () => {
  let iconColor, textColor, bgColor
  const arrColors = Object.values(colorsIconsForCategories).reduce(
    (acc, item) => (acc = [...acc, item.color]),
    []
  );
  const getNoRepeat = (color) => {
    const newColor = arrColors[randomNum(0, 22)]
    if(color === newColor) getNoRepeat(color)
    else return newColor
  }

  iconColor = arrColors[randomNum(0, 22)];
  textColor = arrColors[randomNum(0, 22)];
  bgColor = arrColors[randomNum(0, 22)];
  if(iconColor === textColor) textColor = getNoRepeat(textColor)
  if(iconColor === bgColor) bgColor = getNoRepeat(bgColor)
  if(bgColor === textColor) textColor = getNoRepeat(textColor)
  return { iconColor, textColor, bgColor };
};
