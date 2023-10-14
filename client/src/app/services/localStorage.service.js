const localStorageService = {
  TOKEN_KEY: 'jwt-token',
  REFRESH_KEY: 'jwt-refresh-token',
  EXPIRES_KEY: 'jwt-expires',
  USER_ID: 'user-id',
  STAY_ON: 'stay-on',

  setTokens({
    expiresIn = 3600,
    idToken,
    refreshToken,
    stayOn = false,
    localId,
  }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(this.TOKEN_KEY, idToken);
    localStorage.setItem(this.REFRESH_KEY, refreshToken);
    localStorage.setItem(this.EXPIRES_KEY, expiresDate);
    localStorage.setItem(this.STAY_ON, stayOn);
    localStorage.setItem(this.USER_ID, localId);
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
};

export default localStorageService;
