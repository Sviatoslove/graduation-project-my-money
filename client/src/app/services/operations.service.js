import { httpService } from './http.service';

const operationsEndpoint = 'operations/';

const operationsService = {
  get: async () => {
    const { data } = await httpService.get(operationsEndpoint);
    return data;
  },
  create: async (operation) => {
    const { data } = await httpService.post(operationsEndpoint, operation);
    return data;
  },
  update: async (operation) => {
    const { data } = await httpService.patch(operationsEndpoint, operation);
    return data;
  },
  remove: async (id) => {
    const { data } = await httpService.delete(operationsEndpoint + id);
    return data;
  },
};

export default operationsService;
