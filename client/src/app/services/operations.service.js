import { httpService } from "./http.service";

const operationsEndpoint = "operation/";

const operationsService = {
  get: async () => {
    const { data } = await httpService.get(operationsEndpoint);
    return data;
  },
  create: async (operation) => {
    const { data } = await httpService.post(operationsEndpoint, operation);
    return data;
  },

  remove: async () => {
    const { data } = await httpService.delete(operationsEndpoint);
    return data;
  },
};

export default operationsService;
