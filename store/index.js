import Vuex from "vuex";
import axios from "axios";
import Cookie from "js-cookie";
export const state = () => ({
  token: null
});

export const mutation = {
  setToken(state, token) {
    ///mutations xử lý việc đăng nhập , có action là authenticateUser
    state.token = token;
  }
};

export const actions = {
  authenticateUser(vuexContext, authData) {
    let authUrl = "http://localhost:8000/api/login";

    if (!authData.isLogin) {
      authUrl = "http://127.0.0.1:8000/api/register";
    }
    return axios
      .post(authUrl, {
        username: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(result => {
        vuexContext.commit("setToken", result.data.idToken); //idToken là 1 attribute trong result

        localStorage.setItem("token", result.data.idToken); //lưu idToken vào biến token ở local
        localStorage.setItem(
          "tokenExpiration",
          new Date().getTime + Number.parseInt(result.data.expiresIn) * 1000
        );

        Cookie.set("jwt", result.data.idToken); // lưu giá trị token vào biến jwt trong cookie
        Cookie.set(
          "expirationDate",
          new Date().getTime + Number.parseInt(result.data.expiresIn) * 1000
        );
      })
      .catch(e => {
        console.log(e.response);
      });
  }
};

export const getters = {
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
