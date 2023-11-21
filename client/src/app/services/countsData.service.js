import { httpService } from "./http.service";

const countsDataEndpoint = "countsdata/";

const countsDataService = {
  get: async () => {
    const { data } = await httpService.get(countsDataEndpoint);
    return data;
  },
};

export default countsDataService;
