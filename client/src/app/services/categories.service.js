import { httpService } from "./http.service";

const categoriesEndpoint = "categories/";

const categoriesService = {
  get: async () => {
    const { data } = await httpService.get(categoriesEndpoint);
    return data;
  },
  create: async (category) => {
    const { data } = await httpService.post(categoriesEndpoint, category);
    return data;
  },
  update: async (category) => {
    const { data } = await httpService.patch(categoriesEndpoint, category);
    return data;
  },
  remove: async (categoryId) => {
    const { data } = await httpService.delete(categoriesEndpoint + categoryId);
    return data;
  },
};

export default categoriesService;
