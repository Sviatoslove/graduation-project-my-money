const AvatarsData = require('../models/AvatarsData');
const CountsData = require('../models/CountsData');
const IconsForCategoriesData = require('../models/IconsForCategoriesData');

const avatarsMock = require('../mock/avatars.json')
const countsMock = require('../mock/counts.json')
const iconsforcategoriesMock = require('../mock/iconsForCategories.json');

module.exports = async () => {
  const avatars = await AvatarsData.find();
  if (avatars.length !== avatarsMock.length) {
    await createInitialEntity(AvatarsData, avatarsMock);
  }

  const counts = await CountsData.find();
  if (counts.length !== countsMock.length) {
    await createInitialEntity(CountsData, countsMock);
  }

  const icons = await IconsForCategoriesData.find();
  if (icons.length !== iconsforcategoriesMock.length) {
    await createInitialEntity(IconsForCategoriesData, iconsforcategoriesMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}