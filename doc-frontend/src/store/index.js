import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import bcrypt from "bcryptjs";
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const API_ADDRESS = "http://localhost:8000";

export default new Vuex.Store({
  state: {
    user: {},
    upload_queue: [],
    loggedIn: false,
    oauthCache: {},
    nav: ""
  },
  mutations: {
    login(state, opts) {  //is called after successful login
      state.user = opts.user;
      state.loggedIn = true;
      //@Todo implement auto logout?
      if (state.loggedIn && opts.next) {
        opts.next();
      }
    },
    logout(state) { //is called when the user presses "Log out" option in user menu
      state.user = {};
      state.loggedIn = false;
    },
    /**
     * Adds a file to the upload queue.
     * @param state The current vuex state.
     * @param file Has to be of Format: interface <tt>Document</tt> as seen in meta-api
     */
    addFile(state, file) {
      state.upload_queue.push(file);
    },
    cache(state, data) {
      state.oauthCache = data;
    },
    setDashboardRoute(state, route) {
      state.nav = route;
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
      axios.post(API_ADDRESS + "/user/login", {
        email: data.email,
        password: data.password
      }).then(res => {
        if (res.data.email) {
          context.commit('login', res.data);
          data.router.push("/file");
        }
      }).catch(err => {
        if (err.response.statusCode === 403) {
          alert("Wrong username or password");
        } else if (err.response.statusCode === 500) {
          alert("Our API is experiencing problems, we are currently looking into it.");
        } else {
          console.log(err);
        }
      });
    },
    /**
     * Takes a user and sends it as registration request to the backend.
     * @param context
     * @param data Registration data in the form of: see README ##registration
     */
    register(context, data) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(data.password, salt, (err, hash) => {
          axios.post(API_ADDRESS + "/user/register", {
            nickname: data.nickname,
            email: data.email,
            password: hash
          }).then(res => {
            if (!res.data.err) {
              data.router.push("/login")
            } else {
              if (res.data.exist) {
                alert("User with given email already exists");
                data.router.push("/login");
              }
              console.log(res.data.err)
            }
          }).catch(err => {
            console.log(err);
            alert(err);
          });
        })
      })
    },
    /**
     * Returns a promise which will eventually return message to be displayed to the user.
     * @param context
     * @param router Vue Router Reference
     */
    logout(context, router) {
      context.commit("logout");
      axios.get(API_ADDRESS + "/user/logout").then(res => {
        alert("Successfully logged out");
        console.log(res);
        router.push("/");
      }).catch(err => {
        console.log(err);
        alert("Could not talk to server");
      });
    },
    /**
     * Commences the Google OAuth Sign In Procedure.
     * @param context
     * @param data Contains all the necessary data for the procedure: router, oauth provider
     */
    async oAuthLogin(context, data) {
      if (data.provider === "google") {
        const g = await data.service.signIn();

        //Check if user is already registered with google oauth in the database
        axios.post(API_ADDRESS + '/user/oauth/check/google', {
          access_token: g.getAuthResponse().access_token
        }).then(res => {
          if (res.data.loggedIn) { //the user exists in the database and has been logged in
            context.commit('login', {
              user: res.data,
              next: () => data.router.push('/file')
            });  //Login the user

          }
        })
      }
    },
    uploadFile(context, data) {
      axios.post(API_ADDRESS + '/file/upload', data.formData, {onUploadProgress: data.onProgress}).then(res =>{
        data.onComplete(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  getters: {
    loggedIn: state => {
      return state.loggedIn;
    },
    isAdmin: state => {
      return state.user.isAdmin;
    },
    userName: state => {
      return (state.user.nickname !== "" && state.user.nickname !== undefined) ? state.user.nickname : "User";
    },
    oAuthCache: state => {
      return state.oauthCache;
    },
    email: state => {
      return state.user.email;
    },
    getRoute: state => {
      return state.nav
    }
  },
  modules: {},
  plugins: [createPersistedState()]
})