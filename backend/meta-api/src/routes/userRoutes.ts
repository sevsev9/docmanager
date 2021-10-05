import {Request, Response} from "express";
import {app} from "../index";
import {register, login} from "../database/dbUtil";
import {createUser} from "../protocol/Checks";

// Register
// Login
// Session check middleware
// Profile Links
// Files associated with the user

app.post('/user/*', (req, res, next) => {
  if (!req.body.data.user || !req.body.data.auth || !req.session.user) {
    res.status(400);
    res.send({
      error: true,
      msg: "Malformed request! No valid body included and/or not authenticated."
    });
    res.end();
  } else {
    next();
  }
})

app.post('/register', (req: Request, res: Response) => {
  register(createUser(req.body.data.user)).then((data: any) => {
    res.status(200);
    res.send({
      err: false,
      data
    });
    res.end();
  }).catch((err: Error) => {
    res.status(400);
    res.send({
      err: true,
      msg: err
    })
  });
});

app.post('/login', (req: Request, res: Response) => {
  const auth = req.body.data.auth;
  if (auth && auth.password && (auth.username || auth.email)) {
    if (auth.username) {
      login(auth.password, auth.username).then(r => {
        req.session.user = r;
        res.status(200);
        res.send(r);
        res.end();
      }).catch(err => {
        res.status(400);
        res.send({
          error: true,
          msg: err
        });
        res.end();
      });
    } else {
      login(auth.password, undefined, auth.email).then(r => {
        req.session.user = r;
        res.status(200);
        res.send(r);
        res.end();
      }).catch(err => {
        res.status(400);
        res.send({
          error: true,
          msg: err
        });
        res.end();
      });
    }
  } else {
    res.status(400);
    res.send({
      error: true,
      msg: "Malformed login body!"
    });
    res.end();
  }
});

app.get('/user/logout', (req, res) => {
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
});