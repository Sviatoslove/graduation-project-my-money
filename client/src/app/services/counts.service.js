import { httpService } from './http.service';

const countsEndpoint = 'count/';

const countsService = {
  get: async () => {
    const { data } = await httpService.get(countsEndpoint);
    return data;
  },
  create: async (count) => {
    const { data } = await httpService.post(countsEndpoint, count);
    return data;
  },
  update: async (count) => {
    const { data } = await httpService.patch(countsEndpoint, count);
    return data;
  },
  remove: async (countId) => {
    const { data } = await httpService.delete(countsEndpoint + countId);
    return data;
  },
};

export default countsService;
