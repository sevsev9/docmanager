import axios from "axios";
import bcrypt from "bcrypt";

module.exports = {
  register(user) {
    return new Promise((resolve, reject) => {
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);
      axios.post(process.env.USER_REGISTER, user).then(resolve).catch(reject);
    })
  },
  login(context, auth) {
    return new Promise((resolve, reject) => {
      const salt = bcrypt.genSaltSync(10);
      const usr = {
        password: bcrypt.hashSync(auth.password, salt)
      };
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(auth.key)) { //test for email
        usr.email = auth.key
      } else {
        usr.username = auth.key
      }
      axios.post(process.env.USER_LOGIN, auth).then(res => {
        context.commit('login', res.data.user);
        resolve(res.data.user);
      }).catch(reject);
    })
  },
  oAuthLoginGoogle(context, auth) {

  },
  delete() {  //delete user profile
    return axios.post(process.env.USER_DELETE);
  },
  modify(auth, config) { //@TODO Modify user
    return new Promise((resolve, reject) => {
      resolve(`${auth + config + reject}`);
    })
  },
  getStatistics(auth) { //@TODO Get user statistics
    return new Promise((resolve, reject) => {
      resolve(`${auth + reject}`);
    })
  },
  getProfile() {
    return new Promise((resolve, reject) => {
      axios.get(process.env.USER_GET_PROFILE).then(res => {
        resolve(res.data.user);
      }).catch(reject)
    })
  }
}