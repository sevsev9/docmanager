import Vue from 'vue'
import Vuex from 'vuex'
import fileHandler from './fnc/fileHandling';
import userHandler from './fnc/userHandling';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    upload_queue: [],
    user: {},
    loggedin: false
  },
  mutations: {
    login (state, user) {
      state.user = user
      state.loggedin = true;
    },
    logout (state) {
      state.user = {};
      state.loggedin = false;
    }
  },
  actions: {
    login(context, auth) {
      return userHandler.login(context, auth);
    },
    register(context, user) {
      return userHandler.register(user);
    },
    upload(context, config) {
      return fileHandler.singleUpload(config.metadata, config.file);
    },
    download(context, config) {
      return fileHandler.singleDownload(config);
    },
    /**
     *
     * @param config
     * @returns {Promise<Object>}
     */
    modify(context, config) {
      return fileHandler.modifyFile(config);
    }
  },
  modules: {

  }
})
