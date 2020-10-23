import {Request,Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';

import config from '../config/config';

export const checkJwt = (req:Request,res:Response,next: NextFunction) => {

    console.log('hola mundo');

    console.log(req);

    const token = <string>req.headers['auth'];
    let jwtPayload;
    
    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecrete);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        return res.status(401).send();
    }

    const {userId, username} = jwtPayload;
    const newToken = jwt.sign({userId,username},config.jwtSecrete,{expiresIn:'1h'});
    res.setHeader('token',newToken);
    next();
}