const localStorageService = {
  TOKEN_KEY: "jwt-token",
  REFRESH_KEY: "jwt-refresh-token",
  EXPIRES_KEY: "jwt-expires",
  USER_ID: "user-id",
  STAY_ON: "stay-on",
  MASTER_COUNT: "master-count",
  CATEGORIES_DATA: "categories_data",

  setTokens({
    expiresIn = 3600,
    refreshToken,
    stayOn,
    accessToken,
    userId,
  }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(this.REFRESH_KEY, refreshToken);
    localStorage.setItem(this.EXPIRES_KEY, expiresDate);
    localStorage.setItem(this.STAY_ON, stayOn);
    localStorage.setItem(this.TOKEN_KEY, accessToken);
    localStorage.setItem(this.USER_ID, userId);
  },
  getAccessToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  },
  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_KEY);
  },
  getExpiresKeyToken() {
    return localStorage.getItem(this.EXPIRES_KEY);
  },
  getStayOn() {
    return localStorage.getItem(this.STAY_ON);
  },
  getUserId() {
    return localStorage.getItem(this.USER_ID);
  },

  removeAuthData() {
    Object.keys(this).forEach((key) => localStorage.removeItem(this[key]));
  },

  getMasterCount() {
    return localStorage.getItem(this.MASTER_COUNT);
  },
  getCategoriesData() {
    return localStorage.getItem(this.CATEGORIES_DATA);
  },
  setMasterCount(data) {
    localStorage.setItem(this.MASTER_COUNT, data);
  },
  setCategoriesData(data) {
    localStorage.setItem(this.CATEGORIES_DATA, data);
  },
  removeCategoriesData() {
    localStorage.removeItem(this.CATEGORIES_DATA);
  },
  removeMasterCount() {
    localStorage.removeItem(this.MASTER_COUNT);
  },
};

export default localStorageService;
