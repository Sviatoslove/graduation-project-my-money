const avatars = require('../mock/avatars.json')

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getUrlAvatar() {
  const key = avatars[0].keys[getRandomInt(0, 9)]
  const name = avatars[0].names[getRandomInt(0, 19)]
  let url = avatars[0].url.replace('key', key)
  return url = url.replace('name', name)
}

function generateUserData() {
  return {
    image: getUrlAvatar()
  };
}

module.exports = {
  generateUserData,
};
