import { httpService } from './http.service'

const countsIconsDataEndpoint = 'iconsforcountsdata/'

const countsIconsDataService = {
  get: async () => {
    const { data } = await httpService.get(countsIconsDataEndpoint)
    return data
  }
  // update: async (user) => {
  //   const { data } = await httpService.patch(userEndpoint + user._id, user);
  //   return data;
  // },
}

export default countsIconsDataService
