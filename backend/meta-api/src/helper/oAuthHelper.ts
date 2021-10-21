import axios from "axios";

export class gUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;

  constructor(obj: any) {
    this.id = obj.id;
    this.email = obj.email;
    this.verified_email = obj.verified_email;
    this.name = obj.name;
    this.given_name = obj.given_name;
    this.family_name = obj.family_name;
    this.picture = obj.picture;
    this.locale = obj.locale;
  }
}

/**
 * Checks if the access_token is valid and the email address for it matches the given.
 * @param access_token The Google OAuth Access Token
 * @returns boolean The users email if the access token is valid. Otherwise rejects.
 */
export function getEmailFromAccessToken(access_token: string) {
  return new Promise<gUserInfo>((resolve, reject) => {
    axios.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + access_token).then(res => {
      // console.log(res.data); //@Debug
      resolve(new gUserInfo(res.data));
    }).catch(err => {
      //console.log(err)
      reject(err)
    })
  })
}