import Vuex from "vuex";
import axios from "axios";
import Cookie from "js-cookie";
const state = () => ({
  token: null,
  infoUser: {},
  status: {}
});

const mutations = {
  setToken(state, token) {
    ///mutations xử lý việc đăng nhập , có action là authenticateUser
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  },
  setInfoUser(state, info) {
    state.infoUser = info;
  },
  getStatusLogin(state, info) {
    state.status = info;
  }
};

const actions = {
  authenticateUser(vuexContext, authData) {
    const authUrl = "http://localhost:8000/api/login";

    return axios
      .post(authUrl, {
        email: authData.email,
        password: authData.password
      })
      .then(result => {
        vuexContext.commit("setToken", result.data.access_token);

        localStorage.setItem("token", result.data.access_token);
        localStorage.setItem(
          "tokenExpiration",
          new Date().getTime + Number.parseInt(result.data.expires_in) * 1000
        );

        Cookie.set("jwt", result.data.access_token); // lưu giá trị token vào biến jwt trong cookie
        Cookie.set(
          "expirationDate",
          new Date().getTime + Number.parseInt(result.data.expires_in) * 1000
        );

        const baseUrl = "http://localhost:8000/api/user";
        return axios
          .get(baseUrl, {
            headers: {
              Authorization: "Bearer " + Cookie.get("jwt")
            }
          })
          .then(result => {
            // vuexContext.commit("setInfoUser", result.data);
            // console.log("dkjasdjks");
            localStorage.setItem("infoAcc", result.data);
            Cookie.set("infoAcc", result.data);
          });
      })
      .catch(error => {
        console.log(error.response);
        vuexContext.commit("getStatusLogin", error.response);
      });
  },
  // informationUser(vuexContext) {

  // },
  logout(vuexContext) {
    vuexContext.commit("clearToken");
    Cookie.remove("jwt");
    Cookie.remove("infoAcc");
    Cookie.remove("expirationDate");

    localStorage.removeItem("token");
    localStorage.removeItem("infoAcc");
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
