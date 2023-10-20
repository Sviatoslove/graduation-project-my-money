import { httpService } from "./http.service";

const countsDataEndpoint = "countsdata/";

const countsDataService = {
  get: async () => {
    const { data } = await httpService.get(countsDataEndpoint);
    return data;
  },
  // update: async (user) => {
  //   const { data } = await httpService.patch(userEndpoint + user._id, user);
  //   return data;
  // },
};

export default countsDataService;