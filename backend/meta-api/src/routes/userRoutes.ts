import {Request, Response} from "express";
import {app} from "../index";
import {register, login} from "../database/dbUtil";

// Register
// Login
// Session check middleware
// Profile Links
// Files associated with the user

app.post('/user/*', (req, res, next) => {
  if (!req.body.data.user || !req.body.data.auth) {
    res.status(400);
    res.send({
      error: true,
      msg: "Malformed request! No valid body included."
    });
    res.end();
  }
  next();
})

app.post('/user/register', (req: Request, res: Response) => {
  register(createUser(req.body.data.user)).then( (data:any) => {
    res.status(200);
    res.send({
      err: false,
      data
    });
    res.end();
  }).catch( (err: Error) => {
    res.status(400);
    res.send({
      err: true,
      msg: err
    })
  });
});

app.post('/user/login', (req: Request, res: Response) => {

});