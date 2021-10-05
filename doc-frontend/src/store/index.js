import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import bcrypt from "bcrypt";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const API_ADDRESS = "localhost:8080";

export default new Vuex.Store({
  state: {
    user: {},
    upload_queue: [],
    loggedin: false
  },
  mutations: {
    login(state, user) {  //is called after successful login
      state.user = user;
      state.loggedin = true;
      //@Todo implement auto logout?
    },
    logout(state) { //is called when the user presses "Log out" option in user menu
      state.user = {};
      state.loggedin = false;
    },
    /**
     * Adds a file to the upload queue.
     * @param state The current vuex state.
     * @param file Has to be of Format: interface <tt>Document</tt> as seen in meta-api
     */
    addFile(state, file) {
      state.upload_queue.push(file);
    }
  },
  actions: {
    /**
     * Takes user/password or email/password and sends it to the backend.
     * @param context
     * @param data
     * @returns {Promise<unknown>}
     */
    login(context, data) {
      return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, undefined,salt => {
          bcrypt.hash(data.password, salt, hash => {
            axios.post(API_ADDRESS + "/login", {
              auth: data.auth,
              password: hash
            }).then(res => {
              context.commit('login', res.data.user);
              resolve("Successfully logged in");
            }).catch(err => {
              if (err.response.statusCode === 403) {
                reject("Wrong username or password");
              } else if (err.response.statusCode === 500) {
                reject("Our API is experiencing problems, we are currently looking into it.");
              } else {
                console.log(err);
              }
            });
          })
        })
      })
    },
    /**
     * Takes a user and sends it for registration to the backend.
     * @param context
     * @param data
     */
    register(context, data) {
      return axios.get(API_ADDRESS + "/register", data);
    },
    /**
     * Returns a promise which will eventually return message to be displayed to the user.
     * @param state
     * @returns {Promise<String>}
     */
    logout(state) {
      return new Promise((resolve, reject) => {
        axios.get(API_ADDRESS+"/logout").then(res => {
          state.user = {};
          state.loggedin = false;
          resolve(res.data.msg);
        }).catch(err => {
          reject(err);
        });
      });
    },
    oauthLogin(state, data) {
      console.log(state, data);
    },

  },
  getters: {
    loggedIn: state => {
      return state.loggedin;
    },
    isAdmin: state => {
      return state.user.isAdmin;
    }
  },
  modules: {},
  plugins: [createPersistedState()]
})
