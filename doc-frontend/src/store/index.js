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
        loggedIn: false
    },
    mutations: {
        login(state, user) {  //is called after successful login
            state.user = user;
            state.loggedIn = true;
            //@Todo implement auto logout?
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
                axios.post(API_ADDRESS + "/user/login", {
                    email: data.email,
                    password: data.password
                }).then(res => {
                    if (res.data.email) {
                        context.commit('login', res.data);
                        data.router.push("/user/dashboard");
                    }
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
        },
        /**
         * Takes a user and sends it for registration to the backend.
         * @param context
         * @param data Registration data in the form of: see README ##registration
         */
        register(context, data) {
            return new Promise((resolve, reject) => {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(data.password, salt, (err, hash) => {
                        axios.post(API_ADDRESS + "/user/register", {
                            nickname: data.nickname,
                            email: data.email,
                            password: hash
                        }).then(res => {
                            if (!res.data.err) {
                                data.router.push("/login").then(resolve);
                            } else {
                                console.log(res.data.err)
                            }
                        }).catch(err => {
                            console.log(err);
                            alert(err);
                            reject(err);
                        });
                    })
                })

            });
        },
        /**
         * Returns a promise which will eventually return message to be displayed to the user.
         * @param context
         * @param router Vue Router Reference
         * @returns {Promise<String>}
         */
        logout(context, router) {
            return new Promise((resolve, reject) => {
                axios.get(API_ADDRESS + "/user/logout").then(res => {
                    context.commit('logout');
                    alert(res.data.msg);
                    if (router.history.current.path !== "/") {
                        router.push("/");
                    }
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
            return state.loggedIn;
        },
        isAdmin: state => {
            return state.user.isAdmin;
        },
        userName: state => {
            return (state.user.nickname !== "" && state.user.nickname !== undefined) ? state.user.nickname : "User";
        },
        email: state => {
            return state.user.email;
        }
    },
    modules: {},
    plugins: [createPersistedState()]
})