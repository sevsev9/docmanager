import {Request, Response} from "express";
import {app} from "../index";

app.get('*', (req: Request, res: Response) => {
    res.status(404);
    res.send({
        err: true,
        msg: "Could not find route!"
    })
});

app.get("/", (req: Request, res: Response) => {
    res.status(200);
    res.send({
        error: false,
        msg: "Hello from API!"
    });
    res.end();
});