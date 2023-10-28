import { httpService } from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },
  update: async (user) => {
    const { data } = await httpService.patch(
      userEndpoint + localStorageService.getUserId(),
      user,
    );
    return data;
  },
};

export default userService;
