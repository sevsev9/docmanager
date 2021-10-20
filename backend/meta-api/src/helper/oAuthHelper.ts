import axios from "axios";

/**
 * Checks if the access_token is valid and the email address for it matches the given.
 * @param access_token The Google OAuth Access Token
 * @returns boolean The users email if the access token is valid. Otherwise rejects.
 */
export function getEmailFromAccessToken(access_token: string) {
  return new Promise<any>( (resolve, reject) => {
    axios.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + access_token).then(res => {
      console.log(res); //@Todo
    }).catch(err => {
      console.log(err)
      reject(false)
    })
  })
}