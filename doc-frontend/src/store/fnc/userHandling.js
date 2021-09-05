import axios from "axios";

module.exports = {
  register(user) {
    return new Promise((resolve, reject) => {
      resolve(`${user + reject}`);
    })
  },
  login(context, auth) {
    return new Promise((resolve, reject) => {
      axios.post(process.env.USER_LOGIN, auth).then(res => {
        context.commit('login', res.data.user);
        resolve(res.data.user);
      }).catch(reject);
    })
  },
  delete(auth) {
    return axios.post(process.env.USER_DELETE, auth);
  },
  modify(auth, config) {
    return new Promise((resolve, reject) => {
      resolve(`${auth + config + reject}`);
    })
  },
  getStatistics(auth) {
    return new Promise((resolve, reject) => {
      resolve(`${auth + reject}`);
    })
  },
  getProfile(auth) {
    return new Promise((resolve, reject) => {
      resolve(`${auth + reject}`);
    })
  }
}