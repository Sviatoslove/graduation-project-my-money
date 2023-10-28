import { httpService } from "./http.service";

const currencyDataEndpoint = "currencyData/";

const currencyDataService = {
  get: async () => {
    const { data } = await httpService.get(currencyDataEndpoint);
    return data;
  },
};

export default currencyDataService;
