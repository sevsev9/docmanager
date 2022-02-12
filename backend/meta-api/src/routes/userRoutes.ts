import {Request, Response} from "express";
import Router from "express";
import {register, login, checkOAuth} from "../helper/dbUtil";
import {createUser} from "../protocol/Checks";

// Register
// Login
// Session check middleware
// Profile Links
// Files associated with the user


// SubApi /user/*
const router = Router();

function clearSession(req: Request, res: Response | undefined, next: Function | undefined) {
  return new Promise((resolve, reject) => {
    if (req.session.user) {
      req.session.user = undefined;
      req.session.destroy((err) => {
        if (err) {
          if (res) {
            res.status(500);
            res.send({
              err: true,
              msg: "Error occurred during logout.",
              errmsg: err
            });
          }
          reject(err);
        } else {
          if (res) {
            res.status(200);
            res.send({
              err: false,
              msg: "Successfully logged out."
            })
          }
          if (next) {
            next();
          } else {
            resolve("");
          }
        }
      })
    } else {
      if (next) {
        next();
      } else {
        resolve("");
      }
    }

  })
}

router.post('/register', (req: Request, res: Response) => {
  register(createUser(req.body)).then((data: any) => {
    res.status(200);
    res.send({
      err: false,
      data
    });
    res.end();
  }).catch((err: Error) => {
    // @ts-ignore
    if (err.code === 11000) { // Duplicate Key error -> User exists
      res.status(409);
      res.send({
        err: true,
        msg: (Math.random() > 0.5) ? "User with this email is already registered." : "Bro we already know you, get yoself to the login page."
      })
    } else {
      res.status(400);
      res.send({
        err: true,
        msg: "Bad Request."
      })
    }
  });
});

router.post('/login', (req: Request, res: Response) => {
  const auth = req.body;
  if (auth && auth.password && auth.email) {
    login(auth.password, auth.email).then(r => {
      req.session.user = r;
      res.status(200);
      res.send({
        uid: r._id,
        email: r.email,
        nickname: r.nickname,
        registration_date: r.registration_date
      });
      res.end();
    }).catch(err => {
      console.log(err);
      res.status(400);
      res.send({
        error: true,
        msg: err
      });
      res.end();
    });
  } else {
    res.status(400);
    res.send({
      error: true,
      msg: "Malformed login body!"
    });
    res.end();
  }
});

router.get('/logout', (req, res) => {
  if (!req.session.user) {
    res.status(200);
    res.send({
      err: true,
      msg: "Not logged in!"
    });
  } else {
    clearSession(req, res, undefined).catch(console.error);
  }
});

router.post('/oauth/check/google', (req, res) => {
  clearSession(req, undefined, () => {  //consistency check
    if (req.body && req.body.access_token) {
      checkOAuth(req.body.access_token).then(_res => {
        if (_res) { // If _res contains a IUser => log in
          req.session.user = _res;  //set the session user67
          res.status(200);
          res.send({
            _id: _res._id,
            email: _res.email,
            nickname: _res.nickname,
            registration_date: _res.registration_date,
            loggedIn: true
          });
          res.end();
        }
      });
    } else {
      res.status(400);
      res.send({err: true, msg: "Malformed body."});
      res.end();
    }
  }).catch(console.error);
})

export default router;