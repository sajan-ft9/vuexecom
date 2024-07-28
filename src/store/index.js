import { createStore } from "vuex";
import apiClient from "../axios";

const store = createStore({
  state: {
    auth: {
      user: null,
      token: localStorage.getItem("token") || "",
    },
    errors: [],
  },
  mutations: {
    SET_USER(state, user) {
      state.auth.user = user;
    },
    SET_TOKEN(state, token) {
      state.auth.token = token;
    },
    CLEAR_AUTH(state) {
      state.auth.user = null;
      state.auth.token = "";
    },
    SET_ERRORS(state, errors) {
      state.errors = Array.isArray(errors) ? errors : Object.values(errors).flat();
    },
    CLEAR_ERRORS(state) {
      state.errors = [];
    },
  },
  actions: {
    async login({ commit }, credentials) {
      commit("CLEAR_ERRORS");
      try {
        const response = await apiClient.post("/login", credentials);
        const token = response.data.token;
        const user = response.data.user;
        localStorage.setItem("token", token);
        commit("SET_TOKEN", token);
        commit("SET_USER", user);
        return true;
      } catch (error) {
        if (error.response && error.response.data) {
          commit("SET_ERRORS", error.response.data.errors);
        }else {
          const message = error || 'An unknown error occurred';
          commit('SET_ERRORS', message);
        }
        return false;
      }
    },
    async register({ commit }, userData) {
      commit("CLEAR_ERRORS");
      try {
        const response = await apiClient.post("/register", userData);
        const token = response.data.token;
        const user = response.data.user;
        localStorage.setItem("token", token);
        commit("SET_TOKEN", token);
        commit("SET_USER", user);
        return true;
      } catch (error) {
        if (error.response && error.response.data) {
          commit("SET_ERRORS", error.response.data.errors);
        }
        return false;
      }
    },
    async logout({ commit }) {
      commit("CLEAR_ERRORS");
      try {
        const response = await apiClient.post("/logout");
        localStorage.removeItem("token");
        commit("CLEAR_AUTH");
        return true;
      } catch (error) {
        if (error.response) {
          if(error.response.data){
            commit("SET_ERRORS", error.response.data.errors);
          }
        }
        return false;
      }
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.auth.token;
    },
    user(state) {
      return state.auth.user;
    },
    errors(state){
        return state.errors;
    }
  },
});

export default store;
