import axios from "axios";

/**
 * Checks if the access_token is valid and the email address for it matches the given.
 * @param access_token The Google OAuth Access Token
 * @param email The email to be compared with.
 * @returns boolean True if the authentication information is valid.
 */
export function testAccessToken(access_token: string, email: string) {
  return new Promise<any>( (resolve, reject) => {
    axios.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + access_token).then(res => {
      console.log(res); //@Todo
    }).catch(err => {
      console.log(err)
      reject(false)
    })
  })
}