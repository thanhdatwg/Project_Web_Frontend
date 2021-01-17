import Vuex from "vuex";
import axios from "axios";
import Cookie from "js-cookie";
const state = () => ({
  token: null
});

const mutations = {
  setToken(state, token) {
    ///mutations xử lý việc đăng nhập , có action là authenticateUser
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  }
};

const actions = {
  authenticateUser(vuexContext, authData) {
    const authUrl = "http://localhost:8000/api/login";

    return axios
      .post(authUrl, {
        username: authData.username,
        password: authData.password
      })
      .then(result => {
        console.log(result, "dataLogin");
        vuexContext.commit("setToken", result.data.access_token);

        localStorage.setItem("token", result.data.access_token);
        localStorage.setItem(
          "tokenExpiration",
          new Date().getTime + Number.parseInt(result.data.expires_in) * 1000
        );

        Cookie.set("jwt", result.data.idToken); // lưu giá trị token vào biến jwt trong cookie
        Cookie.set(
          "expirationDate",
          new Date().getTime + Number.parseInt(result.data.expires_in) * 1000
        );
      })
      .catch(e => {
        console.log(e.response);
      });
  },
  logout(vuexContext) {
    vuexContext.commit("clearToken");
    Cookie.remove("jwt");
    Cookie.remove("expirationDate");

    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
  }
};

const getters = {
  isAuthenticated(state) {
    // xử lý trong middleware auth.js
    return state.token != null;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
