import { httpService } from "./http.service";

const countsEndpoint = "counts/";

const countsService = {
  get: async () => {
    const { data } = await httpService.get(countsEndpoint);
    return data;
  },
  // update: async (user) => {
  //   const { data } = await httpService.patch(userEndpoint + user._id, user);
  //   return data;
  // },
};

export default countsService;