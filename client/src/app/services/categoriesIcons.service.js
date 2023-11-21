import { httpService } from "./http.service";

const categoriesIconsEndpoint = "iconsforcategoriesdata/";

const categoriesIconsService = {
  get: async () => {
    const { data } = await httpService.get(categoriesIconsEndpoint);
    return data;
  },
};

export default categoriesIconsService;
