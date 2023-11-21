import { httpService } from "./http.service";

const countsIconsDataEndpoint = "iconsforcountsdata/";

const countsIconsDataService = {
  get: async () => {
    const { data } = await httpService.get(countsIconsDataEndpoint);
    return data;
  },
};

export default countsIconsDataService;
