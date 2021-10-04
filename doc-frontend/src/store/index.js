import Vue from 'vue'
import Vuex from 'vuex'
import fileHandler from './fnc/fileHandling';
import userHandler from './fnc/userHandling';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    upload_queue: [], //files to be uploaded
    user: {}, //user in the current session - if empty user is not logged in
    fileMetadata: []  //contains cached metadata of files which can at least be read by the user
  },
  mutations: {
    login(state, user) {
      state.user = user
      state.loggedin = true;
    },
    logout(state) {
      state.user = {};
      state.upload_queue = [];
      state.fileMetadata = [];
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
     * @param context [ignore] Context given by vuex.
     * @param config Config @Todo to be defined
     * @returns {Promise<Object>}
     */
    modify(context, config) {
      return fileHandler.modifyFile(config);
    },
    delete(context, config) {
      return fileHandler.deleteFile(config);
    },
    logout(context) {
      context.commit('logout');
    }
  },
  modules: {},
  plugins: [createPersistedState()]
})
