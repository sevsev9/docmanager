import {Request, Response} from "express";
import Router from "express";
import {register, login} from "../database/dbUtil";
import {createUser} from "../protocol/Checks";

// Register
// Login
// Session check middleware
// Profile Links
// Files associated with the user


// SubApi /user/*
const router = Router();

router.post('/register', (req: Request, res: Response) => {
  register(createUser(req.body)).then((data: any) => {
    res.status(200);
    res.send({
      err: false,
      data
    });
    res.end();
  }).catch((err: Error) => {
    res.status(400);
    console.log(JSON.stringify(err));
    res.send({
      err: true,
      msg: err
    })
  });
});

router.post('/login', (req: Request, res: Response) => {
  const auth = req.body;
  if (auth && auth.password && auth.email) {
    login(auth.password, auth.email).then(r => {
      req.session.user = r;
      res.status(200);
      res.send({
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
    req.session.user = undefined;
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.status(500);
        res.send({
          err: true,
          msg: "Error occurred during logout.",
          errmsg: err
        })
      } else {
        res.status(200);
        res.send({
          err: false,
          msg: "Successfully logged out."
        })
      }
    })
  }
});

export default router;