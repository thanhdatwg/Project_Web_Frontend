import Vuex from "vuex";
import axios from "axios";
import Cookie from "js-cookie";
const state = () => ({
  token: false
});

const mutations = {
  setToken(state, token) {
    ///mutations xử lý việc đăng nhập , có action là authenticateUser
    state.token = token;
  }
};

const actions = {
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
      .then(result => {})
      .catch(e => {
        console.log(e.response);
      });
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
